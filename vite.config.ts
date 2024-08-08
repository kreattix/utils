import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths(), dts()],
  build: {
    lib: {
      entry: './lib/index.ts',
      name: '@kreattix/utils',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return `kreattix-utils.js`
        return `kreattix-utils.${format}.js`
      }
    },
    sourcemap: true,
    minify: 'esbuild'
  }
})
