import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        'env-valibot': resolve(__dirname, 'lib/src/env-valibot.ts'),
        'env-zod': resolve(__dirname, 'lib/src/env-zod.ts'),
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external: [
        'react/jsx-runtime',
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies),
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
      },
    },
    cssCodeSplit: true,
    target: 'esnext',
    minify: false,
  },
})
