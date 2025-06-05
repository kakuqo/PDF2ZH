# PDF2ZH 插件

![PDF2ZH Logo](lib/icon.png)

一个强大的PDF文档翻译插件，支持多种AI服务提供商和多种语言翻译。

## 🌟 功能特性

- **多平台支持**: 支持 Windows 和 macOS 系统
- **多架构支持**: 支持 ARM64 和 x64 架构
- **多AI服务**: 集成多种翻译服务提供商
  - OpenAI GPT系列
  - Google Gemini
  - Ollama 本地模型
  - DeepL 翻译
  - Deepseek
  - Siliconflow
  - 智谱AI (ZhipuAI)
- **智能布局识别**: 使用ONNX模型进行文档布局分析
- **多语言支持**: 支持中文简体、繁体、粤语等多种语言
- **进度跟踪**: 实时显示翻译进度
- **可取消操作**: 支持中途取消翻译任务

## 📦 项目结构

```
pemo-pdf2zh/
├── lib/                    # 主要源代码
│   ├── index.ts           # 主入口文件
│   ├── manifest.json      # 插件配置文件
│   └── icon.png          # 插件图标
├── engine/                # 核心翻译引擎
│   ├── pdf2zh            # 主执行文件 (macOS/Linux)
│   ├── fonts/            # 字体文件
│   └── models/           # AI模型文件
├── scripts/              # 打包脚本
│   ├── package.js        # 通用打包脚本
│   └── package-plugin.js # 插件专用打包脚本
├── dist/                 # 构建输出目录
└── components/           # UI组件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm (推荐) 或 npm
- TypeScript

### 安装依赖

```bash
pnpm install
```

### 开发构建

```bash
# 使用 TypeScript 编译器构建
npm run tsc-build

# 使用 tsup 构建（推荐）
npm run build
```

### 测试

```bash
npm run test
```

## 📦 打包命令

### 通用打包

```bash
# 构建并打包所有平台
npm run package
```

### 平台特定打包

```bash
# 仅打包 Windows 版本
npm run package:win

# 仅打包 macOS 版本
npm run package:mac
```

## 🔧 配置

### 支持的翻译服务配置

#### OpenAI
```json
{
  "pluginId": "OpenAI",
  "apiKey": "your_openai_api_key",
  "modelName": "gpt-4o",
  "baseURL": "https://api.openai.com/v1"
}
```

#### Google Gemini
```json
{
  "pluginId": "GeminiAI",
  "apiKey": "your_gemini_api_key",
  "modelName": "gemini-1.5-flash"
}
```

#### Ollama (本地)
```json
{
  "pluginId": "OllamaAI",
  "baseURL": "http://localhost:11434",
  "modelName": "gemma2"
}
```

#### DeepL
```json
{
  "pluginId": "DeepLAI",
  "apiKey": "your_deepl_api_key"
}
```

#### Deepseek
```json
{
  "pluginId": "DeepseekAI",
  "apiKey": "your_deepseek_api_key",
  "modelName": "deepseek-chat"
}
```

#### Siliconflow
```json
{
  "pluginId": "SiliconflowAI",
  "apiKey": "your_silicon_api_key",
  "modelName": "Qwen/Qwen2.5-7B-Instruct"
}
```

#### 智谱AI
```json
{
  "pluginId": "ZhipuAI",
  "apiKey": "your_zhipu_api_key",
  "modelName": "glm-4-flash"
}
```

## 📖 使用方法

### 基本用法

```typescript
import Pdf2zhPlugin from '@pemo-plugins/pdf2zh';

const plugin = Pdf2zhPlugin.getInstance();

const config = {
    apiKey: 'your_api_key',
    pluginId: 'OpenAI',
    modelName: 'gpt-4o',
    baseURL: 'https://api.openai.com/v1'
};

const options = {
    filePath: '/path/to/input.pdf',
    outputPath: '/path/to/output',
    sourceLanguage: 'en',
    targetLanguage: 'zh_cn',
    onProgress: (progress) => {
        console.log(`翻译进度: ${progress.percentage}%`);
    }
};

await plugin.translate(config, options, {});
```

### 取消翻译

```typescript
// 取消正在进行的翻译任务
plugin.cancelRequest();
```

## 🌐 支持的语言

- **英语**: `en`
- **中文简体**: `zh_cn`
- **中文繁体**: `zh_tw`
- **粤语**: `yue_cn`
- **日语**: `ja`
- **韩语**: `ko`

## 🛠️ 开发

### 项目技术栈

- **TypeScript**: 主要开发语言
- **tsup**: 现代打包工具
- **pdf-lib**: PDF处理库
- **archiver**: 文件压缩工具

### 构建配置

项目使用 `tsup.config.ts` 进行构建配置：

```typescript
export default defineConfig({
  entry: ['lib/index.ts', 'lib/components/config.tsx'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  format: ['cjs'],
  external: ['react', 'react-dom'],
  target: 'node16',
  noExternal: ['pdf-lib'],
  esbuildOptions: (options) => {
    options.jsx = 'automatic'
  }
})
```

### 可用脚本

- `npm run tsc-build`: 使用 TypeScript 编译器构建
- `npm run build`: 使用 tsup 构建
- `npm run test`: 运行测试
- `npm run package`: 打包所有平台
- `npm run package:win`: 打包 Windows 版本
- `npm run package:mac`: 打包 macOS 版本

## 📝 版本信息

- **当前版本**: 1.0.0
- **版本名称**: beta
- **作者**: Kakuqo

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests 来帮助改进这个项目！

## 📄 许可证

请查看项目根目录下的许可证文件以了解详细信息。

---

## 🔍 故障排除

### 常见问题

1. **执行权限问题**: 如果在 macOS/Linux 上遇到权限问题，请确保 `engine/pdf2zh` 文件具有执行权限。

2. **字体文件缺失**: 确保 `engine/fonts/` 目录包含所需的字体文件。

3. **模型文件缺失**: 确保 `engine/models/` 目录包含 ONNX 模型文件。

4. **API密钥配置**: 确保为选择的翻译服务提供商配置了正确的API密钥。

### 日志调试

插件会在控制台输出详细的调试信息，包括：
- 配置文件路径
- 执行文件路径
- 翻译参数
- 进度信息

如需获得更多帮助，请查看控制台输出或提交 Issue。 