# Components 项目构建选项说明

本项目提供了多种构建选项，可以根据需要选择不同的构建方式。

## 构建脚本

### 1. 默认构建 (不压缩版本)
```bash
npm run build
```
- 生成不压缩的版本（默认）
- 便于调试和阅读代码
- 文件体积较大但可读性好
- 变量名保持原样

### 2. 压缩版本构建
```bash
npm run build:minified
```
- 生成压缩后的生产版本
- 文件体积最小，适合生产环境
- 设置 `MINIFY=true`
- 变量名被混淆为短名称（如a、b、c等）

### 3. 不压缩版本构建
```bash
npm run build:unminified
```
- 明确指定生成不压缩版本
- 便于调试和代码审查
- 设置 `MINIFY=false`
- 变量名保持原样

## 配置说明

### vite.config.ts
```typescript
minify: process.env.MINIFY !== 'false' ? 'terser' : false
```
- 通过环境变量 `MINIFY` 控制是否压缩
- `MINIFY=true` 时使用terser进行压缩
- `MINIFY=false` 或未设置时不压缩（默认）

### terser配置
```typescript
terserOptions: process.env.MINIFY !== 'false' ? {
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
  mangle: {
    keep_fnames: false, // 混淆函数名
    keep_classnames: false, // 混淆类名
  },
} : undefined
```

## 使用建议

- **开发调试**: 使用 `npm run build` 或 `npm run build:unminified`
- **生产部署**: 使用 `npm run build:minified`
- **代码审查**: 使用不压缩版本便于阅读和理解代码结构

## 文件输出对比

| 构建方式 | 文件大小 | 可读性 | 变量名 | 适用场景 |
|---------|---------|--------|--------|----------|
| 不压缩版本 | ~542KB | 高 | 保持原样 | 开发、调试、代码审查 |
| 压缩版本 | ~240KB | 低 | 混淆为短名称 | 生产环境部署 |

## 文件输出

所有构建脚本都会：
1. 执行 TypeScript 编译 (`tsc`)
2. 使用 Vite 构建生产版本
3. 输出到 `dist/components.js`

## 依赖要求

- 压缩版本需要安装 `terser` 依赖：
```bash
npm install --save-dev terser
```

## 示例对比

### 不压缩版本（变量名保持原样）
```javascript
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  // ...
}
```

### 压缩版本（变量名被混淆）
```javascript
function m(e){const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});
// ...
``` 