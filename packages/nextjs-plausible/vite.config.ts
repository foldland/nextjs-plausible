/// <reference types="vitest/config" />

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
      // work around bungs in upstream `@plausible-analytics/tracker`
      // when fixed remove the dynamic imports in:
      // - `init-plausible.ts`
      // - `track.ts`
      external: [
        'react/jsx-runtime',
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies),
      ].filter((e) => {
        return e !== '@plausible-analytics/tracker'
      }),
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
  test: {
    alias: {
      // Next.js aliases these to a no-op at build time depending on which
      // bundle is being built; vitest has no such distinction, so both
      // resolve to the same no-op here.
      'server-only': resolve(__dirname, 'test/noop-module.ts'),
      'client-only': resolve(__dirname, 'test/noop-module.ts'),
    },
    reporters: ['junit', 'default'],
    outputFile: {
      junit: './junit-report.xml',
    },
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html', 'cobertura'],
      exclude: ['test/**'],
    },
  },
})
