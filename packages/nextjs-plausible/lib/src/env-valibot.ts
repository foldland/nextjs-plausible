/**
 * Presets for Valibot
 * @see https://env.t3.gg/docs/customization#extending-presets
 * @module
 */

/** biome-ignore-all lint/style/noProcessEnv: needed to work */
/** biome-ignore-all lint/correctness/noProcessGlobal: this would break the build */
import { createEnv } from '@t3-oss/env-nextjs'
import { pipe, string, url } from 'valibot'
import type { NextEnv } from './env.ts'

/**
 * Next.js plausible Environment Variables
 */
export const plausibleNextjs = (): Readonly<NextEnv> => {
  return createEnv({
    shared: {},

    server: {
      PLAUSIBLE_URL: pipe(string(), url()),
    },

    client: {
      NEXT_PUBLIC_PLAUSIBLE_PROXY_ENDPOINT: string(),
    },

    runtimeEnv: {
      PLAUSIBLE_URL: process.env.PLAUSIBLE_URL,
      NEXT_PUBLIC_PLAUSIBLE_PROXY_ENDPOINT:
        process.env.NEXT_PUBLIC_PLAUSIBLE_PROXY_ENDPOINT,
    },
  })
}
