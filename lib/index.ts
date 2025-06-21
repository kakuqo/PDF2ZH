import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { promisify } from 'util';
import treeKill from 'tree-kill';

/**
 * 从文本中提取 JSON 对象
 * @param {string} text - 要解析的文本
 * @returns {Array} JSON 对象数组
 */
function extractJsonObjects(text: string) {
    const jsonObjects: any = [];
    const prefixedJsonRegex = /(?:Progress Event|Event|JSON):\s*(\{[\s\S]*?\})/gi;
    let match: RegExpExecArray | null = prefixedJsonRegex.exec(text);
    if (match !== null) {
        try {
            const parsed = JSON.parse(match[1]);
            const isDuplicate = jsonObjects.some(
                (existing: any) => JSON.stringify(existing) === JSON.stringify(parsed)
            );
            if (!isDuplicate) {
                jsonObjects.push(parsed);
            }
        } catch (e) {
            // 忽略无法解析的匹配
        }
    }
    return jsonObjects;
}

// 第一个对象：保存环境变量名（类似示例代码）
const providerVars = {
    deepl: {
        apiKey: 'DEEPL_AUTH_KEY',
    },
    ollama: {
        baseUrl: 'OLLAMA_HOST',
        model: 'OLLAMA_MODEL',
        numPredict: 'NUM_PREDICT',
    },
    openai: {
        baseUrl: 'OPENAI_BASE_URL',
        apiKey: 'OPENAI_API_KEY',
        model: 'OPENAI_MODEL',
    },
    zhipu: {
        apiKey: 'ZHIPU_API_KEY',
        model: 'ZHIPU_MODEL',
    },
    siliconflow: {
        baseUrl: 'SILICONFLOW_BASE_URL',
        model: 'SILICONFLOW_MODEL',
        apiKey: 'SILICONFLOW_API_KEY',
    },
    grok: {
        apiKey: 'GROK_API_KEY',
        model: 'GROK_MODEL',
    },
    deepseek: {
        apiKey: 'DEEPSEEK_API_KEY',
        model: 'DEEPSEEK_MODEL',
    },
    xinference: {
        model: 'XINFERENCE_MODEL',
        host: 'XINFERENCE_HOST',
    },
    azureopenai: {
        model: 'AZURE_OPENAI_MODEL',
        baseUrl: 'AZURE_OPENAI_BASE_URL',
        apiKey: 'AZURE_OPENAI_API_KEY',
        apiVersion: 'AZURE_OPENAI_API_VERSION',
    },
    modelscope: {
        model: 'MODELSCOPE_MODEL',
        apiKey: 'MODELSCOPE_API_KEY',
    },
    gemini: {
      apiKey: 'GEMINI_API_KEY',
      model: 'GEMINI_MODEL',
    }
}

// 第二个对象：保存命令行参数名
const providerCommandVars = {
    deepl: {
        apiKey: '--deepl-auth-key',
    },
    ollama: {
        baseUrl: '--ollama-host',
        model: '--ollama-model',
        numPredict: '--num-predict',
    },
    openai: {
        baseUrl: '--openai-base-url',
        apiKey: '--openai-api-key',
        model: '--openai-model',
    },
    zhipu: {
        apiKey: '--zhipu-api-key',
        model: '--zhipu-model',
    },
    siliconflow: {
        baseUrl: '--siliconflow-base-url',
        model: '--siliconflow-model',
        apiKey: '--siliconflow-api-key',
    },
    grok: {
        apiKey: '--grok-api-key',
        model: '--grok-model',
    },
    deepseek: {
        apiKey: '--deepseek-api-key',
        model: '--deepseek-model',
    },
    xinference: {
        model: '--xinference-model',
        host: '--xinference-host',
    },
    azureopenai: {
        model: '--azure-openai-model',
        baseUrl: '--azure-openai-base-url',
        apiKey: '--azure-openai-api-key',
        apiVersion: '--azure-openai-api-version',
    },
    modelscope: {
        model: '--modelscope-model',
        apiKey: '--modelscope-api-key',
    },
    gemini: {
        apiKey: '--gemini-api-key',
        model: '--gemini-model',
    }
}

interface translateOptions {
    filePath: string
    sourceLang: string,
    targetLang: string,
    pageRange?: string, // 1,2,3-5,6,7-9
    prompt?: string,
    outputPath: string,
    model?: string,
    provider: string,
    translators?: any[]
    compare?: boolean,
    dirPath?: string; // 指定批量翻译目录路径
    onProgress?: (progress: { state: string; percentage: string }) => void,
    timeout?: number // 添加超时选项，单位为毫秒
    signalId?: string
}

const langsMap: any = {
    'zh_cn': 'zh-CN',
    'zh_tw': 'zh-TW',
    'yue_cn': 'zh-HK',
}

interface Pdf2zhConfig {
    maxProcesses?: number;
}

export default class Pdf2zhPlugin {
    private static instance: Pdf2zhPlugin | null = null;
    private processMap: Map<string, any> = new Map();
    private cancelledProcesses: Set<string> = new Set();
    private maxProcesses: number = 10;

    private constructor() {}

    public static getInstance(): Pdf2zhPlugin {
        if (!Pdf2zhPlugin.instance) {
            Pdf2zhPlugin.instance = new Pdf2zhPlugin();
        }
        return Pdf2zhPlugin.instance;
    }

    public configure(config: Pdf2zhConfig): void {
        if (config.maxProcesses !== undefined) {
            if (config.maxProcesses < 1) {
                throw new Error('最大并发进程数必须大于0');
            }
            this.maxProcesses = config.maxProcesses;
        }
    }

    public getmaxProcesses(): number {
        return this.maxProcesses;
    }

    private generateProcessId(filePath: string): string {
        return `${filePath}_${Date.now()}`;
    }

    private async waitForAvailableSlot(): Promise<void> {
        while (this.processMap.size >= this.maxProcesses) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    public async translate(options: translateOptions) {
        // 等待可用进程槽
        await this.waitForAvailableSlot();

        const processId = options.signalId || this.generateProcessId(options.filePath);
        let currentProcess: any = null;

        try {
            // 检查是否已被取消
            if (this.cancelledProcesses.has(processId)) {
                throw new Error('翻译已被取消');
            }

            // console.log('translate', options)
            // const configJson = this.getConfigJson(options)

            // 设置默认超时时间（3分钟无输出则超时）
            const timeout = options.timeout || 3 * 60 * 1000;
            let timeoutId: NodeJS.Timeout;
            let lastOutputTime = Date.now();

            // 组装pdf2zh命令参数
            // 根据平台选择不同的可执行文件
            let pdf2zhPath = "";
            let restorePath = "";
            if (process.platform === 'win32') {
                pdf2zhPath = path.resolve(__dirname, 'pdf2zh_next', 'pdf2zh.exe');
                restorePath = path.resolve(__dirname, 'pdf2zh_next', 'offline_assets.zip');
            } else {
                pdf2zhPath = path.resolve(__dirname, 'pdf2zh_next', 'pdf2zh');
                restorePath = path.resolve(__dirname, 'pdf2zh_next', 'offline_assets.zip');
            }
            const inputPdf = options.filePath;
            const outputDir = options.outputPath;
            fs.mkdirSync(outputDir, { recursive: true });
            let langFrom = langsMap[options.sourceLang] || options.sourceLang || 'en';
            let langTo = langsMap[options.targetLang] || options.targetLang || 'zh';
            if (langFrom === 'zh-CN') {
                langFrom = 'zh';
            }
            if (langTo === 'zh-CN') {
                langTo = 'zh';
            }
            const args = [
                inputPdf,
                '--lang-in', langFrom,
                '--lang-out', langTo,
                '--output', outputDir,
                `--${options.provider}`,
                '--watermark-output-mode', 'no_watermark'
            ];
            const translator = options.translators?.find((item: any) => item.name === options.provider);
            let commandsKey = providerCommandVars[options.provider as keyof typeof providerCommandVars];
            let providerKey = providerVars[options.provider as keyof typeof providerVars];
            if (commandsKey && translator) {
                for (const key in commandsKey) {
                    if (translator.envs[providerKey[key as keyof typeof providerKey]]) {
                        args.push(commandsKey[key as keyof typeof commandsKey], translator.envs[providerKey[key as keyof typeof providerKey]]);
                    }
                }
            }
            if (restorePath) {
                args.push('--restore-offline-assets', restorePath);
            }
            if (options.prompt?.length) {
                args.push('--custom-system-prompt', options.prompt);
            }

            if (options.pageRange) {
                args.push('--pages', options.pageRange);
            }

            // 打印所有关键路径
            console.log('翻译参数', JSON.stringify(args))

            // 确保 pdf2zh 具有执行权限
            try {
                // 检查文件是否存在
                if (!fs.existsSync(pdf2zhPath)) {
                    throw new Error(`可执行文件不存在: ${pdf2zhPath}`);
                }

                // 检查文件权限
                const stats = fs.statSync(pdf2zhPath);
                console.log('文件权限:', stats.mode.toString(8));

                await promisify(fs.chmod)(pdf2zhPath, '755');
                console.log('已添加执行权限到', pdf2zhPath);

                // 再次检查权限
                const newStats = fs.statSync(pdf2zhPath);
                console.log('更新后文件权限:', newStats.mode.toString(8));
            } catch (error) {
                console.error('文件权限处理失败:', error);
                throw error;
            }

            // 在启动进程前再次检查是否已被取消
            if (this.cancelledProcesses.has(processId)) {
                throw new Error('翻译已被取消');
            }

            return new Promise<{
                dualPath: string,
                monoPath: string,
                dualPaths?: string[],
                monoPaths?: string[],
            }>((resolve, reject) => {
                // 添加调试信息
                console.log('执行命令:', pdf2zhPath);
                console.log('命令参数:', args);
                console.log('工作目录:', process.cwd());
                console.log('当前环境变量 PATH:', process.env.PATH);

                currentProcess = spawn(pdf2zhPath, args, {
                    cwd: process.cwd(),
                    env: process.env,
                    stdio: ["pipe", "pipe", "pipe"],
                });

                // 将进程添加到进程Map
                console.log('addprocessMap', processId)
                this.processMap.set(processId, currentProcess);

                // 立即检查进程是否启动成功
                if (!currentProcess.pid) {
                    reject(new Error('进程启动失败'));
                    return;
                }
                console.log('进程已启动，PID:', currentProcess.pid);

                // 设置进程启动超时检测
                const startTimeout = setTimeout(() => {
                    console.log('进程启动超时，可能已挂起');
                }, 5000); // 5秒超时

                // 设置输出超时检测函数
                const resetTimeout = () => {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    lastOutputTime = Date.now();
                    timeoutId = setTimeout(() => {
                        const timeSinceLastOutput = Date.now() - lastOutputTime;
                        if (timeSinceLastOutput >= timeout && currentProcess) {
                            console.log(`翻译进程超过${timeout/1000}秒无输出，强制终止`);
                            this.cancelRequest(processId);
                            reject(new Error(`翻译超时：${timeout/1000}秒内无输出`));
                        }
                    }, timeout);
                };

                // 初始化超时检测
                resetTimeout();

                currentProcess.stdout?.on('data', (data: any) => {
                    clearTimeout(startTimeout); // 有输出说明进程正常工作
                    const output = data.toString();
                    // 重置超时计时器
                    resetTimeout();
                    const jsonArray = extractJsonObjects(output);
                    if (jsonArray?.length) {
                        console.log('jsonArray', JSON.stringify(jsonArray, null, 2));
                        const jsonObjects = jsonArray[0];
                        options.onProgress?.({
                            state: jsonObjects.state == 'Save PDF' ? '1' : '0',
                            percentage: jsonObjects.state == 'Save PDF' ? '100' : Math.round(parseFloat(jsonObjects.overall_progress)).toString(),
                        });
                    }
                });

                currentProcess.stderr?.on('data', (data: any) => {
                    console.log('stderr', data.toString());
                    const info = data.toString()
                    if (info.indexOf('pdf2zh: error:') > -1) {
                        const errorInfo = info.split('pdf2zh: error:')[1]
                        reject(new Error(errorInfo));
                    }
                });

                currentProcess.on('close', async (code: number | null) => {
                    // 从进程Map和取消集合中移除
                    this.processMap.delete(processId);
                    this.cancelledProcesses.delete(processId);
                    clearTimeout(startTimeout);
                    clearTimeout(timeoutId);
                    currentProcess = null;
                    console.log('进程退出，退出码:', code);
                    if (code === 0) {
                        console.log('PDF翻译完成');
                        
                        // 动态获取输出文件夹下的所有文件
                        try {
                            const files = fs.readdirSync(options.outputPath);
                            console.log('输出文件夹文件列表:', files);
                            
                            // 重命名PDF文件，移除no_watermark标识
                            const renamedFiles: string[] = [];
                            
                            for (const file of files) {
                                if (file.toLowerCase().endsWith('.pdf')) {
                                    const oldPath = path.join(options.outputPath, file);
                                    let newFileName = file;
                                    
                                    // 移除文件名中的 .no_watermark 部分
                                    if (file.includes('.no_watermark.')) {
                                        newFileName = file.replace('.no_watermark.', '.');
                                        
                                        const newPath = path.join(options.outputPath, newFileName);
                                        try {
                                            fs.renameSync(oldPath, newPath);
                                            console.log(`文件重命名: ${file} -> ${newFileName}`);
                                            renamedFiles.push(newFileName);
                                        } catch (renameError) {
                                            console.error(`重命名文件失败: ${file}`, renameError);
                                            renamedFiles.push(file); // 保留原文件名
                                        }
                                    } else {
                                        renamedFiles.push(file);
                                    }
                                }
                            }
                            
                            console.log('重命名后的文件列表:', renamedFiles);
                            
                            // 使用重命名后的PDF文件列表
                            const pdfFiles = renamedFiles;
                            
                            // 检查是否有PDF文件
                            if (pdfFiles.length === 0) {
                                reject(new Error('no pdf files found after translation'));
                                return;
                            }
                            
                            // 根据文件名是否包含"dual"分类
                            const dualFiles = pdfFiles.filter(file => file.toLowerCase().includes('dual'));
                            const monoFiles = pdfFiles.filter(file => file.toLowerCase().includes('mono'));
                            
                            // 构建完整路径
                            const dualPaths = dualFiles.map(file => path.join(options.outputPath, file));
                            const monoPaths = monoFiles.map(file => path.join(options.outputPath, file));
                            
                            console.log('双语PDF文件:', dualPaths);
                            console.log('单语PDF文件:', monoPaths);
                            
                            // 检查是否至少有一个有效文件
                            if (dualPaths.length === 0 && monoPaths.length === 0) {
                                reject(new Error('generate pdf file error'));
                                return;
                            }
                            
                            resolve({
                                dualPath: dualPaths.length > 0 ? dualPaths[0] : '', // 如果有多个dual文件，返回第一个
                                monoPath: monoPaths.length > 0 ? monoPaths[0] : '', // 如果有多个mono文件，返回第一个
                                dualPaths, // 返回所有dual文件路径
                                monoPaths, // 返回所有mono文件路径
                            });
                        } catch (error) {
                            console.error('读取输出文件夹失败:', error);
                            reject(new Error(`failed to read output directory: ${error instanceof Error ? error.message : String(error)}`));
                        }
                    } else {
                        const codeMessage = code === null ? '进程被信号终止' : `错误码: ${code}`;
                        console.log('翻译进程异常退出:', codeMessage);
                        reject(new Error(`pdf2zh 进程退出，${codeMessage}`));
                        // 检查输出文件是否存在
                        // const outputExists = fs.existsSync(options.outputPath);
                        // console.log(`输出文件夹${outputExists ? '存在' : '不存在'}: ${options.outputPath}`);
                        // reject(new Error(`pdf2zh 进程退出，${codeMessage}`));
                    }
                });

                currentProcess.on('error', (err: Error) => {
                    // 从进程Map和取消集合中移除
                    this.processMap.delete(processId);
                    this.cancelledProcesses.delete(processId);
                    clearTimeout(startTimeout);
                    currentProcess = null;
                    console.log('进程启动错误:', err.message);
                    console.log('错误详情:', err);
                    reject(err);
                });
            });
        } catch (error) {
            // 确保在发生错误时也清理进程
            if (currentProcess) {
                this.processMap.delete(processId);
                this.cancelledProcesses.delete(processId);
            }
            throw error;
        }
    }

    public cancelRequest(processId?: string) {
        console.log('cancelRequest', processId)
        if (processId) {
            // 取消特定进程
            this.cancelledProcesses.add(processId);
            const process = this.processMap.get(processId);
            console.log('cancelRequest process', this.processMap, process)
            if (process) {
                console.log('cancelRequest process')
                this.terminateProcess(process);
                this.processMap.delete(processId);
                return true;
            }
            return false;
        } else {
            // 取消所有进程
            let success = true;
            for (const [id, process] of this.processMap.entries()) {
                this.cancelledProcesses.add(id);
                if (!this.terminateProcess(process)) {
                    success = false;
                }
                this.processMap.delete(id);
            }
            return success;
        }
    }

    private terminateProcess(process: any): boolean {
        try {
            treeKill(process.pid, 'SIGKILL', (err) => {
                if (err) {
                    console.error('终止进程失败:', err);
                } else {
                    console.log('进程及其子进程已成功终止');
                }
            });
            return true;
        } catch (error) {
            console.error('终止进程失败:', error);
            return false;
        }
    }

    public getActiveProcessCount(): number {
        return this.processMap.size;
    }

    public getActiveProcessIds(): string[] {
        return Array.from(this.processMap.keys());
    }

    public isProcessCancelled(processId: string): boolean {
        return this.cancelledProcesses.has(processId);
    }

    public getCancelledProcessIds(): string[] {
        return Array.from(this.cancelledProcesses);
    }
}