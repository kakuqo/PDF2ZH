import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Archiver from 'archiver';
import { exec } from 'child_process';
import { promisify } from 'util';
import crypto from 'crypto';

const execAsync = promisify(exec);

// 获取 __dirname 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取项目根目录和lib目录
const projectRoot = path.join(__dirname, '..');
const pluginsDir = path.join(projectRoot, 'lib');
const bucketDomain = 'https://github.com/kakuqo/pemo-pdf2zh/releases/'

// 构建组件项目
async function buildComponents() {
    const componentsPath = path.join(projectRoot, 'components');
    console.log('Building components...');
    try {
        const { stdout, stderr } = await execAsync('pnpm build', {
            cwd: componentsPath
        });
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        console.log('Components build completed');
    } catch (error) {
        console.error('Components build failed:', error.message);
        throw error;
    }
}

// 构建插件
async function buildPlugin(pluginPath) {
    console.log('Building plugin...');
    try {
        const { stdout, stderr } = await execAsync('pnpm build', {
            cwd: pluginPath
        });
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
    } catch (error) {
        console.error('Build failed:', error.message);
        throw error;
    }
}

// 清理旧的打包文件
function cleanOldPackages(pluginName) {
    const outputDir = path.join(projectRoot, 'output');
    if (!fs.existsSync(outputDir)) {
        return;
    }

    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        if (file.endsWith('.pemox') && file.startsWith(pluginName)) {
            const filePath = path.join(outputDir, file);
            fs.unlinkSync(filePath);
            console.log(`Removed old package: ${file}`);
        }
    }
}

// 获取所有有效的插件目录
function getAllPlugins() {
    // 对于当前项目结构，我们只有一个插件项目（lib目录）
    const packageJsonPath = path.join(projectRoot, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return [packageJson.name || 'pdf2zh-plugin'];
    }
    return ['pdf2zh-plugin'];
}

// 更新版本号
async function updateVersion(pluginPath, newVersion) {
    // 更新 package.json
    const packageJsonPath = path.join(pluginPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.version = newVersion;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`Updated version in package.json to ${newVersion}`);
    }

    // 更新 lib/manifest.json
    const manifestPath = path.join(pluginPath, 'lib/manifest.json');
    if (fs.existsSync(manifestPath)) {
        const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        manifestContent.version = newVersion;
        fs.writeFileSync(manifestPath, JSON.stringify(manifestContent, null, 2));
        console.log(`Updated version in lib/manifest.json to ${newVersion}`);
    }
}

// 递增版本号
function incrementVersion(version) {
    const parts = version.split('.');
    parts[2] = (parseInt(parts[2]) + 1).toString();
    return parts.join('.');
}

// 打包单个插件
async function packagePlugin(pluginName, version, shouldIncrement) {
    console.log(`\n=== Processing plugin: ${pluginName} ===`);
    
    // 对于当前项目结构，插件就是整个项目
    const pluginPath = projectRoot;
    
    // 清理旧的插件包
    cleanOldPackages(pluginName);

    let finalVersion = version;
    // 如果需要递增版本号，读取当前插件的版本号并递增
    if (shouldIncrement && !version) {
        const packageJsonPath = path.join(pluginPath, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            finalVersion = incrementVersion(packageJson.version);
            console.log(`Plugin ${pluginName} version auto-incremented to: ${finalVersion}`);
        }
    }

    // 更新版本号
    if (finalVersion) {
        await updateVersion(pluginPath, finalVersion);
    }

    // 读取 package.json 获取 displayName 和 version
    const packageJsonPath = path.join(pluginPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        console.error(`No package.json found for plugin "${pluginName}"`);
        return { success: false, hash: '' };
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const { displayName, version: currentVersion } = packageJson;
    
    if (!displayName) {
        console.error(`No displayName found in package.json for plugin "${pluginName}"`);
        return { success: false, hash: '' };
    }

    try {
        // 先构建 components 项目
        await buildComponents();
        
        // 构建插件
        await buildPlugin(pluginPath);

        const distPath = path.join(pluginPath, 'dist');
        
        // 检查是否存在dist目录
        if (!fs.existsSync(distPath)) {
            console.error(`Build failed: No dist directory found for plugin "${pluginName}"`);
            return { success: false, hash: '' };
        }
        
        // 复制 components.js 到插件的 dist 目录
        const componentsSourcePath = path.join(projectRoot, 'components/dist/components.js');
        const componentsDestPath = path.join(distPath, 'components.js');
        
        if (fs.existsSync(componentsSourcePath)) {
            fs.copyFileSync(componentsSourcePath, componentsDestPath);
            console.log('Copied components.js to plugin dist directory');
        } else {
            console.warn('Components.js not found, skipping copy');
        }
        
        // 修改输出路径到 output 文件夹
        const outputDir = path.join(projectRoot, 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const outputPath = path.join(outputDir, `${displayName}@${currentVersion}.pemox`);
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
                console.log(`${displayName}@${currentVersion}.pemox has been created - ${archive.pointer()} total bytes`);
                
                // 复制图标文件
                const ogIcon = path.join(distPath, 'icon.png');
                const destIcon = path.join(outputDir, `${displayName}.png`);
                if (fs.existsSync(ogIcon)) {
                    fs.copyFileSync(ogIcon, destIcon);
                }
                
                // 计算文件 hash
                try {
                    fileHash = await calculateFileHash(outputPath);
                    console.log(`File hash: ${fileHash}`);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
            
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
                const basicInfo = {
                    ...manifestContent,
                    fileHash: fileHash,
                    link: `${bucketDomain}/${manifestContent.pluginId}@${manifestContent.version}.pemox`,
                    icon: `${bucketDomain}/${manifestContent.pluginId}.png`
                };

                const fileInfoPath = path.join(outputDir, 'fileInfo.json');
                let existingManifests = [];
                
                // 读取现有的 fileInfo.json（如果存在）
                if (fs.existsSync(fileInfoPath)) {
                    try {
                        existingManifests = JSON.parse(fs.readFileSync(fileInfoPath, 'utf8'));
                    } catch (error) {
                        console.error('Error reading existing fileInfo.json:', error.message);
                    }
                }

                // 更新或添加新的插件信息
                const index = existingManifests.findIndex(m => m.pluginId === basicInfo.pluginId);
                if (index !== -1) {
                    existingManifests[index] = basicInfo;
                } else {
                    existingManifests.push(basicInfo);
                }

                fs.writeFileSync(fileInfoPath, JSON.stringify(existingManifests, null, 2));
                console.log('\nUpdated fileInfo.json with new plugin information');
            } catch (error) {
                console.error(`Failed to update fileInfo.json for plugin "${pluginName}":`, error.message);
            }
        }

        return { success: true, hash: fileHash };
    } catch (error) {
        console.error(`Failed to package plugin "${pluginName}":`, error.message);
        return { success: false, hash: '' };
    }
}

// 打包多个插件
async function packagePlugins(pluginNames, version, shouldIncrement) {
    const results = [];
    const failed = [];
    const manifestInfos = [];
    
    for (const pluginName of pluginNames) {
        const { success, hash } = await packagePlugin(pluginName, version, shouldIncrement);
        if (success) {
            results.push(pluginName);
            
            // 对于当前项目结构，manifest.json在lib目录下
            const manifestPath = path.join(projectRoot, 'lib/manifest.json');
            if (fs.existsSync(manifestPath)) {
                try {
                    const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                    // 只保留基本字段
                    const basicInfo = {
                        ...manifestContent,
                        fileHash: hash,
                        link: `${bucketDomain}/${manifestContent.pluginId}@${manifestContent.version}.pemox`,
                        icon: `${bucketDomain}/${manifestContent.pluginId}.png`
                    };
                    manifestInfos.push(basicInfo);
                } catch (error) {
                    console.error(`Failed to read manifest.json for plugin "${pluginName}":`, error.message);
                }
            }
        } else {
            failed.push(pluginName);
        }
    }

    // 写入 fileInfo.json
    if (manifestInfos.length > 0) {
        const fileInfoPath = path.join(projectRoot, 'output/fileInfo.json');
        let existingManifests = [];
        
        // 读取现有的 fileInfo.json（如果存在）
        if (fs.existsSync(fileInfoPath)) {
            try {
                existingManifests = JSON.parse(fs.readFileSync(fileInfoPath, 'utf8'));
            } catch (error) {
                console.error('Error reading existing fileInfo.json:', error.message);
            }
        }

        // 更新或添加新的插件信息
        for (const newManifest of manifestInfos) {
            const index = existingManifests.findIndex(m => m.pluginId === newManifest.pluginId);
            if (index !== -1) {
                existingManifests[index] = newManifest;
            } else {
                existingManifests.push(newManifest);
            }
        }

        fs.writeFileSync(fileInfoPath, JSON.stringify(existingManifests, null, 2));
        console.log('\nGenerated fileInfo.json with manifest information');
    }

    // 打印总结
    console.log('\n=== Packaging Summary ===');
    if (results.length > 0) {
        console.log('\nSuccessfully packaged plugins:');
        console.log(results.join(', '));
    }
    if (failed.length > 0) {
        console.log('\nFailed to package plugins:');
        console.log(failed.join(', '));
    }
    
    return failed.length === 0;
}

// 主函数
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.error('Please specify plugin name(s) or use --all for all plugins');
        console.error('Usage: node package-plugin.js [--all | plugin1 plugin2 ...] [--version version] [--increment]');
        process.exit(1);
    }

    let pluginsToPackage = [];
    let version = null;
    let shouldIncrement = false;
    
    // 解析命令行参数
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--version' && i + 1 < args.length) {
            version = args[i + 1];
            i++; // 跳过下一个参数
        } else if (args[i] === '--increment') {
            shouldIncrement = true;
        } else if (args[i] === '--all') {
            pluginsToPackage = getAllPlugins();
            if (pluginsToPackage.length === 0) {
                console.error('No valid plugins found');
                process.exit(1);
            }
            console.log('Found plugins:', pluginsToPackage.join(', '));
        } else {
            pluginsToPackage.push(args[i]);
        }
    }

    if (pluginsToPackage.length === 0) {
        console.error('Please specify at least one plugin name');
        process.exit(1);
    }

    const success = await packagePlugins(pluginsToPackage, version, shouldIncrement);
    process.exit(success ? 0 : 1);
}

// 执行主函数
main().catch(err => {
    console.error('Error during packaging:', err);
    process.exit(1);
}); 

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