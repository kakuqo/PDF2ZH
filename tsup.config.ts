import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/components/config.tsx'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false,
  format: ['cjs'],
  external: ['react', 'react-dom'],
  target: 'node16',
  noExternal: ['tree-kill'],
  esbuildOptions: (options) => {
    options.jsx = 'automatic'
  }
})
