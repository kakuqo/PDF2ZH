import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
// import { InjectCssToJsPlugin } from 'vite-plugin-inject-css-to-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // InjectCssToJsPlugin(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': process.env
  },
  build: {
    cssCodeSplit: true,
    minify: process.env.MINIFY !== 'false' ? 'terser' : false, // 使用terser作为压缩器
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'Pdf2zh',
      formats: ['umd'],
      fileName: (format) => `components.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
        exports: 'named'
      },
    },
    target: 'es2015',
    terserOptions: process.env.MINIFY !== 'false' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        keep_fnames: false, // 混淆函数名
        keep_classnames: false, // 混淆类名
      },
    } : undefined,
  },
})
