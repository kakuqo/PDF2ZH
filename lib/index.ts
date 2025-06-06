import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { PDFDocument } from 'pdf-lib';
interface translateConfig {
    apiKey?: string;
    provider: string;
    model?: string;
    baseURL?: string;
    prompt?: string;
    customVars?: any[];
    translators?: any[];
    outputPath: string
}

interface translateOptions {
    filePath: string
    sourceLanguage: string
    targetLanguage: string
    pages?: string; // 1,2,3-5,6,7-9
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

    private getConfigJson(config: translateConfig, options: translateOptions) {
        // const translatorsMap: any = {
        //     'GeminiAI': {
        //         name: 'gemini',
        //         envs: {
        //             'GEMINI_API_KEY': config.apiKey,
        //             'GEMINI_MODEL': config.modelName || 'gemini-1.5-flash'
        //         }
        //     },
        //     'OllamaAI': {
        //         name: 'ollama',
        //         envs: {
        //             'OLLAMA_HOST': config.baseURL || 'http://localhost:11434',
        //             'OLLAMA_MODEL': config.modelName || 'gemma2'
        //         }
        //     },
        //     'OpenAI': {
        //         name: 'openai',
        //         envs: {
        //             'OPENAI_BASE_URL': config.baseURL || 'https://api.openai.com/v1',
        //             'OPENAI_API_KEY': config.apiKey,
        //             'OPENAI_MODEL': config.modelName || 'gpt-4o'
        //         }
        //     },
        //     'DeepLAI': {
        //         name: 'deepl',
        //         envs: {
        //             'DEEPL_AUTH_KEY': config.apiKey,
        //         }
        //     },
        //     'DeepseekAI': {
        //         name: 'deepseek',
        //         envs: {
        //             'DEEPSEEK_API_KEY': config.apiKey,
        //             'DEEPSEEK_MODEL': config.modelName || 'deepseek-chat'
        //         }
        //     },
        //     'SiliconflowAI': {
        //         name: 'silicon',
        //         envs: {
        //             'SILICON_API_KEY': config.apiKey,
        //             'SILICON_MODEL': config.modelName || 'Qwen/Qwen2.5-7B-Instruct'
        //         }
        //     },
        //     'ZhipuAI': {
        //         name: 'zhipu',
        //         envs: {
        //             'ZHIPU_API_KEY': config.apiKey,
        //             'ZHIPU_MODEL': config.modelName || 'glm-4-flash'
        //         }
        //     }
        // }
        // const translators = [{
        //     name: options.provider,
        //     envs: {
        //         'GOOGLE_API_KEY': config.apiKey,
        //     }
        // }]
        const fontPath = this.getFontOptions(options.targetLanguage);
        const notoFontPath = path.resolve(__dirname, 'engine', 'fonts', fontPath);
        return {
            "USE_MODELSCOPE": "0",
            // "PDF2ZH_LANG_FROM": options.sourceLanguage || "English",
            // "PDF2ZH_LANG_TO": "Simplified Chinese",
            "NOTO_FONT_PATH": notoFontPath,
            "translators": config.translators
        }
    }

    public async translate(config: translateConfig, options: translateOptions, pluginConfig: pluginConfig) {
        // 重置取消标志
        this.isCancelled = false;
        
        console.log('translate', config)
        const configJson = this.getConfigJson(config, options)

        // 检查是否已被取消
        if (this.isCancelled) {
            throw new Error('翻译已被取消');
        }

        // 将配置写入文件
        const configPath = path.join(__dirname, 'config.json');
        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
        let promptPath = '';
        if (config.prompt?.length) {
            promptPath = path.join(__dirname, 'prompt.txt');
            fs.writeFileSync(promptPath, config.prompt);
        }
        console.log(`配置文件已保存到 ${configPath}`);
        console.log(path.resolve(__dirname))

        // 组装pdf2zh命令参数
        // 根据平台选择不同的可执行文件
        let pdf2zhPath = '';
        let onnxPath = '';
        if (process.platform === 'win32') {
            pdf2zhPath = path.resolve(__dirname, 'pdf2zh.py');
            onnxPath = path.resolve(__dirname, 'engine', 'doclayout.py');
        } else {
            pdf2zhPath = path.resolve(__dirname, 'engine', 'pdf2zh');
            onnxPath = path.resolve(__dirname, 'engine', 'models', 'doclayout.onnx');
        }
        // const pdf2zhPath = path.resolve(__dirname, 'engine', pdf2zhExecutable);
        const inputPdf = options.filePath;
        const outputDir = config.outputPath;
        const langFrom = langsMap[options.sourceLanguage] || options.sourceLanguage || 'en';
        const langTo = langsMap[options.targetLanguage] || options.targetLanguage || 'zh-CN';
        const args = [
            inputPdf,
            '--lang-in', langFrom,
            '--lang-out', langTo,
            '--onnx', onnxPath,
            '--output', outputDir,
            '--service', config.provider || 'google',
            '--config', configPath,
        ];
        if (config.prompt?.length) {
            args.push('--prompt', promptPath);
        }

        if (options.pages) {
            args.push('--pages', options.pages);
        }

        if (options.dirPath) {
            args.push('--dir', options.dirPath);
        }

        // 打印所有关键路径
        console.log('翻译参数', JSON.stringify(args))

        // 确保 pdf2zh 具有执行权限
        try {
            await promisify(fs.chmod)(pdf2zhPath, '755');
            console.log('已添加执行权限到', pdf2zhPath);
        } catch (error) {
            console.error('添加执行权限失败:', error);
        }

        // 在启动进程前再次检查是否已被取消
        if (this.isCancelled) {
            throw new Error('翻译已被取消');
        }

        return new Promise<void>((resolve, reject) => {
            this.currentProcess = spawn(pdf2zhPath, args);

            // 监听标准错误
            this.currentProcess.stderr?.on('data', (data: Buffer) => {
                if (this.isCancelled) {
                    this.currentProcess.kill();
                    this.currentProcess = null;
                    this.isCancelled = false;
                    return;
                }
                const output = data.toString();
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
                this.currentProcess = null;
                this.isCancelled = false;
                if (code === 0) {
                    console.log('PDF翻译完成');
                    if (pluginConfig.compare) {
                        const baseName = path.basename(options.filePath).replace('.pdf', '');
                        const inputPdf = path.join(config.outputPath, `${baseName}-dual.pdf`);
                        const outputPdf = path.join(config.outputPath, `${baseName}-compared.pdf`);
                        await mergePagesideBySide(inputPdf, outputPdf);
                    }
                    resolve();
                } else {
                    const codeMessage = code === null ? '进程被信号终止' : `错误码: ${code}`;
                    console.log('翻译进程退出', codeMessage);
                    // 检查输出文件是否存在
                    const outputExists = fs.existsSync(outputDir);
                    console.log(`输出文件夹${outputExists ? '存在' : '不存在'}: ${outputDir}`);
                    reject(new Error(`pdf2zh 进程退出，${codeMessage}`));
                }
            });
            this.currentProcess.on('error', (err: Error) => {
                this.currentProcess = null;
                this.isCancelled = false;
                console.log('翻译错误', err);
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