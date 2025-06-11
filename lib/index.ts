import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';

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
    translatePlugin: string,
    translateId: string,
    pageRange?: string, // 1,2,3-5,6,7-9
    prompt?: string,
    outputPath: string,
    model?: string,
    provider: string,
    translators?: any[]
    compare?: boolean,
    dirPath?: string; // 指定批量翻译目录路径
    onProgress?: (progress: { percentage: string; current: string; total: string; }) => void
}

interface pluginConfig {
    compare?: boolean
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

    private getFontOptions(lang: string): string {
        const fontOptions: any = {
            'en': 'SourceHanSerifCN-Regular.ttf',
            'ja': 'SourceHanSerifJP-Regular.ttf',
            'ko': 'SourceHanSerifKR-Regular.ttf',
            'zh_cn': 'SourceHanSerifCN-Regular.ttf',
            'zh_tw': 'SourceHanSerifTW-Regular.ttf',
            'yue_cn': 'SourceHanSerifHK-Regular.ttf',
        }
        return fontOptions[lang] || 'GoNotoKurrent-Regular.ttf';
    }

    // private getConfigJson(options: translateOptions) {

    //     const fontPath = this.getFontOptions(options.targetLang);
    //     const notoFontPath = path.resolve(__dirname, 'engine', 'fonts', fontPath);
    //     return {
    //         "USE_MODELSCOPE": "0",
    //         // "PDF2ZH_LANG_FROM": options.sourceLanguage || "English",
    //         // "PDF2ZH_LANG_TO": "Simplified Chinese",
    //         "NOTO_FONT_PATH": notoFontPath,
    //         "translators": options.translators
    //     }
    // }

    public async translate(options: translateOptions) {
        // 重置取消标志
        this.isCancelled = false;

        console.log('translate', options)
        // const configJson = this.getConfigJson(options)

        // 检查是否已被取消
        if (this.isCancelled) {
            throw new Error('翻译已被取消');
        }

        // 将配置写入文件
        // let configPath = path.join(__dirname, 'config.json');
        // fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
        // console.log(`配置文件已保存到 ${configPath}`);
        // let promptPath = '';
        // if (options.prompt?.length) {
        //     promptPath = path.join(__dirname, 'prompt.txt');
        //     fs.writeFileSync(promptPath, options.prompt);
        // }
        // console.log(path.resolve(__dirname))

        // 组装pdf2zh命令参数
        // 根据平台选择不同的可执行文件
        let pdf2zhPath = '';
        let restorePath = '';
        if (process.platform === 'win32') {
            pdf2zhPath = path.resolve(__dirname, 'engine', 'build', 'pdf2zh.exe');
        } else {
            pdf2zhPath = path.resolve(__dirname, 'pdf2zh_next', 'pdf2zh');
            restorePath = path.resolve(__dirname, 'pdf2zh_next', 'offline_assets.zip');
        }
        // const pdf2zhPath = path.resolve(__dirname, 'engine', pdf2zhExecutable);
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
            `--${options.provider}`
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

            // 配置 spawn 选项
            const spawnOptions = {
                stdio: ['inherit', 'pipe', 'pipe'] as ['inherit', 'pipe', 'pipe'],
                cwd: process.cwd(), // 明确设置工作目录
                env: {
                    ...process.env, // 继承所有环境变量
                    // 如果需要特定的环境变量，可以在这里添加
                }
            };

            this.currentProcess = spawn(pdf2zhPath, args, spawnOptions);

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

            // 监听标准输出（之前缺少这个）
            this.currentProcess.stdout?.on('data', (data: Buffer) => {
                clearTimeout(startTimeout); // 有输出说明进程正常工作
                const output = data.toString();
                console.log('stdout:', output);
            });

            // 监听标准错误
            this.currentProcess.stderr?.on('data', (data: Buffer) => {
                if (this.isCancelled) {
                    this.currentProcess.kill();
                    this.currentProcess = null;
                    this.isCancelled = false;
                    return;
                }
                clearTimeout(startTimeout); // 有输出说明进程正常工作
                const output = data.toString();
                console.log('stderr:', output); // 添加标识以便区分
                // 匹配类似 "0%|          | 0/1 [00:00<?, ?it/s]" 的格式
                const pageMatch = output.match(/\|\s*(\d+)\/(\d+)\s*\[/);
                let currentPage;
                let totalPages;
                let progressPercent;
                if (pageMatch) {
                    currentPage = pageMatch[1];
                    totalPages = pageMatch[2];
                    console.log(`当前页: ${currentPage}, 总页数: ${totalPages}`);
                }

                if (output.includes("%")) {
                    const progressMatch = output.match(/(\d+)%/);
                    if (progressMatch) {
                        progressPercent = progressMatch[1];
                        console.log(`翻译进度: ${progressPercent}%`);
                    }
                }

                if (currentPage && totalPages && progressPercent) {
                    options.onProgress?.({
                        percentage: progressPercent,
                        current: currentPage,
                        total: totalPages,
                    });
                }
            });

            this.currentProcess.on('close', async (code: number | null) => {
                clearTimeout(startTimeout);
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
            this.currentProcess.kill();
            this.currentProcess = null;
            console.log('翻译已取消');
            return true;
        } else {
            console.log('翻译已取消（准备阶段）');
            return true;
        }
    }
}

/**
 * 将PDF文件的相邻两页水平合并为一页
 * @param {string} inputPath - 输入PDF文件路径
 * @param {string} outputPath - 输出PDF文件路径
 */
async function mergePagesideBySide(inputPath: string, outputPath: string) {
    try {
        // 读取输入PDF文件
        const existingPdfBytes = fs.readFileSync(inputPath);
        const inputPdf = await PDFDocument.load(existingPdfBytes);

        // 创建新的PDF文档
        const outputPdf = await PDFDocument.create();

        const pages = inputPdf.getPages();
        const numPages = pages.length;

        // 遍历页面，每两页合并为一页
        for (let i = 0; i < numPages; i += 2) {
            const leftPage = pages[i];
            const leftWidth = leftPage.getWidth();
            const height = leftPage.getHeight();

            let rightPage = null;
            let rightWidth = leftWidth; // 如果没有右页，假设宽度相同

            if (i + 1 < numPages) {
                rightPage = pages[i + 1];
                rightWidth = rightPage.getWidth();
            }

            // 计算新页面的宽度
            const newWidth = leftWidth + rightWidth;

            // 创建新的空白页面
            const newPage = outputPdf.addPage([newWidth, height]);

            // 嵌入左页面
            const [leftPageEmbedded] = await outputPdf.embedPages([leftPage]);
            newPage.drawPage(leftPageEmbedded, {
                x: 0,
                y: 0,
                width: leftWidth,
                height: height,
            });

            // 如果存在右页面，嵌入右页面
            if (rightPage) {
                const [rightPageEmbedded] = await outputPdf.embedPages([rightPage]);
                newPage.drawPage(rightPageEmbedded, {
                    x: leftWidth,
                    y: 0,
                    width: rightWidth,
                    height: height,
                });
            }
        }

        // 保存输出PDF
        const pdfBytes = await outputPdf.save();
        fs.writeFileSync(outputPath, pdfBytes);

        console.log(`Successfully merged pages side by side: ${outputPath}`);
    } catch (error) {
        console.error("Error merging pages side by side:", error);
        throw error;
    }
}