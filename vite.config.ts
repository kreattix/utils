import EsLint from 'vite-plugin-linter'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import tsConfigPaths from 'vite-tsconfig-paths'

const { EsLinter, linterPlugin } = EsLint

export default defineConfig((configEnv) => ({
  plugins: [
    tsConfigPaths(),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx,js,jsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'Kreattix Utils',
      formats: ['es', 'cjs'],
      fileName: (format) => `index${format === 'cjs' ? '' : '.' + format}.js`,
    },
    sourcemap: true,
    minify: 'esbuild',
  },
}))
