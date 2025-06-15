import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';

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
}

const langsMap: any = {
    'zh_cn': 'zh-CN',
    'zh_tw': 'zh-TW',
    'yue_cn': 'zh-HK',
}

export default class Pdf2zhPlugin {
    private currentProcess: any = null;
    private isCancelled: boolean = false;

    public static getInstance() {
        return new Pdf2zhPlugin();
    }

    public async translate(options: translateOptions) {
        // 重置取消标志
        this.isCancelled = false;

        console.log('translate', options)
        // const configJson = this.getConfigJson(options)

        // 检查是否已被取消
        if (this.isCancelled) {
            throw new Error('翻译已被取消');
        }

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
        ];
        let commandsKey = providerCommandVars[options.provider as keyof typeof providerCommandVars];
        if (commandsKey) {
            for (const key in commandsKey) {
                if (options[key as keyof translateOptions]) {
                    args.push(commandsKey[key as keyof typeof commandsKey], options[key as keyof translateOptions]);
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
        if (this.isCancelled) {
            throw new Error('翻译已被取消');
        }

        return new Promise<{
            dualPath: string,
            monoPath: string,
        }>((resolve, reject) => {
            // 添加调试信息
            console.log('执行命令:', pdf2zhPath);
            console.log('命令参数:', args);
            console.log('工作目录:', process.cwd());
            console.log('当前环境变量 PATH:', process.env.PATH);

            this.currentProcess = spawn(pdf2zhPath, args, {
                cwd: process.cwd(),
                env: process.env,
                stdio: ["pipe", "pipe", "pipe"],
              });

            // 立即检查进程是否启动成功
            if (!this.currentProcess.pid) {
                reject(new Error('进程启动失败'));
                return;
            }
            console.log('进程已启动，PID:', this.currentProcess.pid);

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
                    if (timeSinceLastOutput >= timeout && this.currentProcess) {
                        console.log(`翻译进程超过${timeout/1000}秒无输出，强制终止`);
                        this.currentProcess.kill('SIGKILL');
                        this.currentProcess = null;
                        reject(new Error(`翻译超时：${timeout/1000}秒内无输出`));
                    }
                }, timeout);
            };

            // 初始化超时检测
            resetTimeout();

            this.currentProcess.stdout?.on('data', (data: any) => {
                // 首先检查是否已取消
                if (this.isCancelled) {
                    try {
                        // 使用 SIGKILL 信号强制终止进程
                        this.currentProcess.kill('SIGKILL');
                        console.log('进程已取消，使用 SIGKILL 信号强制终止进程');
                        // 确保进程被终止
                        if (this.currentProcess.pid) {
                            try {
                                console.log('进程已取消，使用 process.kill 信号强制终止进程');
                                process.kill(this.currentProcess.pid, 'SIGKILL');
                            } catch (e) {
                                // 忽略进程已不存在的错误
                            }
                        }
                        this.currentProcess = null;
                        this.isCancelled = false;
                        return;
                    } catch (error) {
                        console.error('终止进程失败:', error);
                    }
                }

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

            this.currentProcess.stderr?.on('data', (data: any) => {
                console.log('stderr', data.toString());
            });

            this.currentProcess.on('close', async (code: number | null) => {
                clearTimeout(startTimeout);
                clearTimeout(timeoutId); // 清除超时计时器
                this.currentProcess = null;
                this.isCancelled = false;
                console.log('进程退出，退出码:', code);
                if (code === 0) {
                    console.log('PDF翻译完成');
                    const baseName = path.basename(options.filePath).replace('.pdf', '');
                    // if (options.compare) {
                    //     const inputPdf = path.join(options.outputPath, `${baseName}.${langTo}.dual.pdf`);
                    //     const outputPdf = path.join(options.outputPath, `${baseName}-compared.pdf`);
                    //     try {
                    //         await mergePagesideBySide(inputPdf, outputPdf);
                    //     } catch (error) {
                    //         console.error('合并页面失败:', error);
                    //         reject(new Error('合并页面失败'));
                    //     }
                    // }
                    resolve({
                        dualPath: path.join(options.outputPath, `${baseName}.${langTo}.dual.pdf`),
                        monoPath: path.join(options.outputPath, `${baseName}.${langTo}.mono.pdf`),
                    });
                } else {
                    const codeMessage = code === null ? '进程被信号终止' : `错误码: ${code}`;
                    console.log('翻译进程异常退出:', codeMessage);
                    // 检查输出文件是否存在
                    const outputExists = fs.existsSync(options.outputPath);
                    console.log(`输出文件夹${outputExists ? '存在' : '不存在'}: ${options.outputPath}`);
                    reject(new Error(`pdf2zh 进程退出，${codeMessage}`));
                }
            });

            this.currentProcess.on('error', (err: Error) => {
                clearTimeout(startTimeout);
                this.currentProcess = null;
                this.isCancelled = false;
                console.log('进程启动错误:', err.message);
                console.log('错误详情:', err);
                reject(err);
            });
        });
    }

    public cancelRequest() {
        // 设置取消标志
        this.isCancelled = true;

        if (this.currentProcess) {
            try {
                // 使用 SIGKILL 信号强制终止进程
                this.currentProcess.kill('SIGKILL');
                // 确保进程被终止
                if (this.currentProcess.pid) {
                    try {
                        process.kill(this.currentProcess.pid, 'SIGKILL');
                    } catch (e) {
                        // 忽略进程已不存在的错误
                    }
                }
                this.currentProcess = null;
                console.log('翻译已取消');
                return true;
            } catch (error) {
                console.error('终止进程失败:', error);
                return false;
            }
        } else {
            console.log('翻译已取消（准备阶段）');
            return true;
        }
    }
}