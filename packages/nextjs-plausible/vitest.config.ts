import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      // Next.js aliases these to a no-op at build time depending on which
      // bundle is being built; vitest has no such distinction, so both
      // resolve to the same no-op here.
      'server-only': new URL('./test/noop-module.ts', import.meta.url).pathname,
      'client-only': new URL('./test/noop-module.ts', import.meta.url).pathname,
    },
  },
  test: {
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
