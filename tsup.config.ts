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
  noExternal: ['pdf-lib'],
  esbuildOptions: (options) => {
    options.jsx = 'automatic'
  }
})
