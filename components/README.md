# PDF2ZH React Component

一个功能强大的PDF翻译配置组件，支持多种翻译服务和自定义配置。

## 特性

- 🌍 **多语言支持** - 支持简体中文、繁体中文、英文、日文
- 🎨 **深色/浅色主题** - 自适应主题支持
- 🔧 **多服务商支持** - Google、DeepL、OpenAI、Ollama等
- ⚙️ **自定义配置** - 支持动态环境变量配置
- 📱 **响应式设计** - 适配各种屏幕尺寸

## 使用方法

### 基础用法

```tsx
import { Pdf2zh } from '@your-org/pdf2zh-component'

function App() {
  return (
    <Pdf2zh
      lang="zh-CN"          // 语言设置
      isDark={false}        // 主题设置
      data={{
        outputPath: '/path/to/output',
        provider: 'openai',
        model: 'gpt-4o',
        // ... 其他配置
      }}
      updateData={(config) => {
        console.log('配置更新:', config)
      }}
    />
  )
}
```

### 多语言配置

支持的语言：

- `zh-CN` - 简体中文（默认）
- `zh-TW` - 繁体中文
- `en` - English
- `ja` - 日本語

```tsx
// 简体中文
<Pdf2zh lang="zh-CN" />

// 英文
<Pdf2zh lang="en" />

// 繁体中文
<Pdf2zh lang="zh-TW" />

// 日文
<Pdf2zh lang="ja" />
```

### 自定义翻译

如果需要自定义翻译或添加新语言：

```tsx
import { Pdf2zh } from '@your-org/pdf2zh-component'

const customTranslations = {
  '保存': 'Save',
  '重置': 'Reset',
  // ... 更多翻译
}

function App() {
  const t = (key: string) => customTranslations[key] || key
  
  return (
    <Pdf2zh
      _t={t}  // 传入自定义翻译函数
      // ... 其他props
    />
  )
}
```

### 自定义服务商配置

支持动态配置环境变量：

```tsx
const customServiceData = {
  provider: 'custom-service',
  customVars: [
    { key: 'API_KEY', value: 'your-api-key' },
    { key: 'BASE_URL', value: 'https://your-api.com' },
    { key: 'MODEL', value: 'your-model' }
  ]
}

<Pdf2zh data={customServiceData} />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lang` | `string` | `'zh-CN'` | 界面语言 |
| `isDark` | `boolean` | `false` | 深色主题 |
| `data` | `object` | `{}` | 配置数据 |
| `_t` | `function` | - | 自定义翻译函数 |
| `updateData` | `function` | - | 配置更新回调 |
| `className` | `string` | - | 自定义样式类 |

## 开发

### 运行演示

```bash
npm run dev
```

### 构建组件

```bash
npm run build
```

### 查看演示

组件支持多语言切换和主题切换功能，可以在实际项目中测试多语言功能。

## 许可证

AGPL-3.0 