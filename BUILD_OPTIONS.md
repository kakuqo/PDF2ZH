# 构建选项说明

本项目提供了多种构建选项，可以根据需要选择不同的构建方式。

## 构建脚本

### 1. 默认构建 (不压缩版本)
```bash
npm run build
```
- 生成不压缩的版本（默认）
- 便于调试和阅读代码
- 文件体积较大但可读性好

### 2. 压缩版本构建
```bash
npm run build:minified
```
- 生成压缩后的生产版本
- 文件体积最小，适合生产环境
- 设置 `MINIFY=true`

### 3. 不压缩版本构建
```bash
npm run build:unminified
```
- 明确指定生成不压缩版本
- 便于调试和代码审查
- 设置 `MINIFY=false`

## 配置说明

### tsup.config.ts
```typescript
minify: process.env.MINIFY === 'true'
```
- 通过环境变量 `MINIFY` 控制是否压缩
- `MINIFY=true` 时进行压缩
- `MINIFY=false` 或未设置时不压缩（默认）

## 使用建议

- **开发调试**: 使用 `npm run build` 或 `npm run build:unminified`
- **生产部署**: 使用 `npm run build:minified`
- **代码审查**: 使用不压缩版本便于阅读和理解代码结构

## 文件输出对比

| 构建方式 | 文件大小 | 可读性 | 适用场景 |
|---------|---------|--------|----------|
| 不压缩版本 | ~21KB | 高 | 开发、调试、代码审查 |
| 压缩版本 | ~10KB | 低 | 生产环境部署 |

## 文件输出

所有构建脚本都会：
1. 清理 `dist` 目录
2. 使用 tsup 构建 TypeScript 代码
3. 复制必要的资源文件（JSON、SVG、PNG等）
4. 输出到 `dist` 目录

## 环境变量

- `MINIFY=true`: 启用压缩
- `MINIFY=false`: 禁用压缩（默认）
- 未设置 `MINIFY`: 禁用压缩 