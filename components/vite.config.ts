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
  },
})
