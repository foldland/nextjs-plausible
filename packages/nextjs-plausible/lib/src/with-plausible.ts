import type { NextConfig } from 'next'
import type { NextEnv } from './env.ts'

/**
 * Enhances a Next.js configuration by appending a rewrite that routes
 * Plausible proxy traffic to the local `/api/event` handler.
 *
 * The rewrite is defined from `env.PLAUSIBLE_PROXY_ENDPOINT` to the full
 * absolute URL for `/api/event` under `env.PLAUSIBLE_URL`, and is merged into
 * the existing `nextConfig.rewrites` result (supports both array-based and
 * object-based `afterFiles` styles).
 *
 * @param env - Environment values required to construct the Plausible rewrite.
 * @returns A function that takes an existing `NextConfig` and returns a new
 *          `NextConfig` with the Plausible rewrite appended.
 */
export function withPlausible(
  env: NextEnv
): (nextConfig: NextConfig) => NextConfig {
  const plausibleRewrites = [
    {
      source: env.PLAUSIBLE_PROXY_ENDPOINT,
      destination: new URL('/api/event', env.PLAUSIBLE_URL).href,
    },
  ]

  return (nextConfig: NextConfig): NextConfig => {
    return {
      ...nextConfig,

      rewrites: async () => {
        const rewrites = await nextConfig.rewrites?.()

        if (!rewrites) {
          return plausibleRewrites
        }
        if (Array.isArray(rewrites)) {
          return rewrites.concat(plausibleRewrites)
        }
        if (rewrites.afterFiles) {
          rewrites.afterFiles = rewrites.afterFiles.concat(plausibleRewrites)
          return rewrites
        }
        rewrites.afterFiles = plausibleRewrites
        return rewrites
      },
    }
  }
}
