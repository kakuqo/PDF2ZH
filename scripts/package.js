import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Archiver from 'archiver';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';
import axios from 'axios';

const execAsync = promisify(exec);

// 获取 __dirname 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录
const projectRoot = path.join(__dirname, '..');
const bucketDomain = 'https://github.com/kakuqo/PDF2ZH/releases/download'
const fileInfoUrl = "https://plugin-list.pemo.ai/plugins-list";

async function updatePluginList() {
    try {
        const fileInfoPath = path.join(projectRoot, 'output', 'fileInfo.json');
        let fileInfo = JSON.parse(fs.readFileSync(fileInfoPath, 'utf8'));
        let onlinePluginList = await getPluginList();
        if (onlinePluginList && onlinePluginList.length) {
            const index = onlinePluginList.findIndex(m => m.pluginId === fileInfo.pluginId);
            if (index !== -1) {
                onlinePluginList[index] = fileInfo;
            } else {
                onlinePluginList.push(fileInfo);
            }
        }
        console.log(onlinePluginList);
        // fs.writeFileSync(fileInfoPath, JSON.stringify(fileInfo, null, 2));
        // const response = await axios.post(fileInfoUrl, data, {
        //     headers: { 'Content-Type': 'application/json' },
        //     httpsAgent: agent
        // });
        // return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getPluginList() {
    try {
        const response = await axios.get(fileInfoUrl, {
            headers: { 'Content-Type': 'application/json' },
        });
        const res = response.data;
        if (res && res.success && res.data && res.data.length) {
            return res.data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return null;
    }
}

// 根据平台拷贝engine文件夹
function copyEngineByPlatform(platform) {
    const distPath = path.join(projectRoot, 'dist');
    const engineDistPath = path.join(distPath, 'pdf2zh_next');
    
    // 确保dist目录存在
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
    }
    
    // 清空并创建engine目录
    if (fs.existsSync(engineDistPath)) {
        fs.rmSync(engineDistPath, { recursive: true, force: true });
    }
    fs.mkdirSync(engineDistPath, { recursive: true });
    
    let sourcePath;
    if (platform === 'win') {
        sourcePath = path.join(projectRoot, 'pdf2zh_next_window');
        console.log('正在拷贝Windows引擎文件...');
    } else if (platform === 'mac') {
        sourcePath = path.join(projectRoot, 'pdf2zh_next');
        console.log('正在拷贝Mac引擎文件...');
    } else {
        console.error('无效的平台参数。请使用 --platform win 或 --platform mac');
        process.exit(1);
    }
    
    if (!fs.existsSync(sourcePath)) {
        console.error(`源引擎目录不存在: ${sourcePath}`);
        process.exit(1);
    }
    
    // 递归拷贝文件夹内容
    copyDirectoryRecursive(sourcePath, engineDistPath);
    console.log(`引擎文件已从 ${sourcePath} 拷贝到 ${engineDistPath}`);
}

// 递归拷贝目录
function copyDirectoryRecursive(source, target) {
    const items = fs.readdirSync(source);
    
    for (const item of items) {
        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);
        
        const stat = fs.statSync(sourcePath);
        if (stat.isDirectory()) {
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath, { recursive: true });
            }
            copyDirectoryRecursive(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

// 构建组件项目
async function buildComponents() {
    const componentsPath = path.join(projectRoot, 'components');
    console.log('正在构建组件...');
    try {
        const { stdout, stderr } = await execAsync('pnpm build', {
            cwd: componentsPath
        });
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        console.log('组件构建完成');
    } catch (error) {
        console.error('组件构建失败:', error.message);
        throw error;
    }
}

// 构建插件
async function buildPlugin(pluginPath) {
    console.log('正在构建插件...');
    try {
        const { stdout, stderr } = await execAsync('pnpm build', {
            cwd: pluginPath
        });
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
    } catch (error) {
        console.error('构建失败:', error.message);
        throw error;
    }
}

// 清理旧的打包文件
function cleanOldPackages(pluginName, platform) {
    const outputDir = path.join(projectRoot, 'output');
    if (!fs.existsSync(outputDir)) {
        return;
    }

    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        if (file.endsWith(`${platform}.pemox`) && file.startsWith(pluginName)) {
            const filePath = path.join(outputDir, file);
            fs.unlinkSync(filePath);
            console.log(`已删除旧的包文件: ${file}`);
        }
    }
}

// 计算文件hash
function calculateFileHash(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const input = fs.createReadStream(filePath);

        input.on('error', reject);
        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
                resolve(data.toString('hex'));
            }
        });

        input.pipe(hash);
    });
}

// 打包插件
async function packagePlugin(platform) {
    console.log(`\n=== 正在为 ${platform} 平台打包插件 ===`);
    
    const pluginPath = projectRoot;
    
    // 读取 package.json 获取 displayName 和 version
    const packageJsonPath = path.join(pluginPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        console.error('找不到 package.json 文件');
        return false;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const { displayName, version } = packageJson;
    
    if (!displayName) {
        console.error('package.json 中找不到 displayName');
        return false;
    }

    // 清理旧的插件包
    cleanOldPackages(displayName, platform);

    try {
        // 先构建 components 项目
        await buildComponents();
        
        // 构建插件
        await buildPlugin(pluginPath);

        // 根据平台拷贝engine文件夹
        copyEngineByPlatform(platform);

        const distPath = path.join(pluginPath, 'dist');
        
        // 检查是否存在dist目录
        if (!fs.existsSync(distPath)) {
            console.error('构建失败: 找不到 dist 目录');
            return false;
        }
        
        // 复制 components.js 到插件的 dist 目录
        const componentsSourcePath = path.join(projectRoot, 'components/dist/components.js');
        const componentsDestPath = path.join(distPath, 'components.js');
        
        if (fs.existsSync(componentsSourcePath)) {
            fs.copyFileSync(componentsSourcePath, componentsDestPath);
            console.log('已复制 components.js 到插件 dist 目录');
        } else {
            console.warn('找不到 components.js，跳过复制');
        }
        
        // 修改输出路径到 output 文件夹
        const outputDir = path.join(projectRoot, 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPath = path.join(outputDir, `${displayName}@${version}-${platform}.pemox`);
        const output = fs.createWriteStream(outputPath);
        const archive = Archiver('zip', {
            zlib: { level: 9 } // 设置压缩级别
        });
        
        // 监听错误和完成事件
        archive.on('error', (err) => {
            throw err;
        });
        
        let fileHash = '';
        await new Promise((resolve, reject) => {
            output.on('close', async () => {
                console.log(`${displayName}@${version}-${platform}.pemox 已创建 - ${archive.pointer()} 总字节数`);
                
                // 复制图标文件
                const ogIcon = path.join(distPath, 'icon.png');
                const destIcon = path.join(outputDir, `${displayName}.png`);
                if (fs.existsSync(ogIcon)) {
                    fs.copyFileSync(ogIcon, destIcon);
                }
                
                // 计算文件 hash
                try {
                    fileHash = await calculateFileHash(outputPath);
                    console.log(`文件哈希: ${fileHash}`);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
            
            output.on('error', (err) => reject(err));
            archive.on('error', (err) => reject(err));
            
            // 将输出流连接到归档器
            archive.pipe(output);
            
            // 添加dist目录下的所有文件到归档
            archive.directory(distPath, false);
            
            // 完成归档
            archive.finalize();
        });

        // 更新 fileInfo.json
        const manifestPath = path.join(pluginPath, 'lib/manifest.json');
        if (fs.existsSync(manifestPath)) {
            try {
                const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                // 只保留基本字段
                let basicInfo = {
                    ...manifestContent,
                    icon: `${bucketDomain}/v${manifestContent.version}/${manifestContent.pluginId}.png`,
                    platform: platform
                };
                if (platform === 'win') {
                    basicInfo.winLink = `${bucketDomain}/v${manifestContent.version}/${manifestContent.pluginId}@${manifestContent.version}-win.pemox`;
                    basicInfo.winFileHash = fileHash;
                } else if (platform === 'mac') {
                    basicInfo.macLink = `${bucketDomain}/v${manifestContent.version}/${manifestContent.pluginId}@${manifestContent.version}-mac.pemox`;
                    basicInfo.macFileHash = fileHash;
                }
                const fileInfoPath = path.join(outputDir, 'fileInfo.json');
                if (fs.existsSync(fileInfoPath)) {
                    const existingInfo = JSON.parse(fs.readFileSync(fileInfoPath, 'utf8'));
                    if (existingInfo.pluginId === basicInfo.pluginId) {
                        basicInfo = {
                            ...existingInfo,
                            ...basicInfo,
                        }
                    }
                }
                fs.writeFileSync(fileInfoPath, JSON.stringify(basicInfo, null, 2));
                console.log('\n已更新 fileInfo.json 文件');
            } catch (error) {
                console.error('更新 fileInfo.json 失败:', error.message);
            }
        }

        return true;
    } catch (error) {
        console.error('插件打包失败:', error.message);
        return false;
    }
}

// 主函数
async function main() {
    const args = process.argv.slice(2);
    
    let platform = null;
    
    // 解析命令行参数
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--platform' && i + 1 < args.length) {
            platform = args[i + 1];
            i++; // 跳过下一个参数
        }
    }
    
    if (!platform) {
        console.error('请指定平台参数 --platform win 或 --platform mac');
        console.error('用法: node package.js --platform [win|mac]');
        process.exit(1);
    }
    
    if (platform !== 'win' && platform !== 'mac') {
        console.error('无效的平台参数。请使用 --platform win 或 --platform mac');
        process.exit(1);
    }

    const success = await packagePlugin(platform);
    process.exit(success ? 0 : 1);
}

// 执行主函数
main().catch(err => {
    console.error('打包过程中发生错误:', err);
    process.exit(1);
}); 

// updatePluginList()