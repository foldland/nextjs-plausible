import 'client-only'

import type { init, PlausibleConfig } from '@plausible-analytics/tracker'
import type { NextEnv } from './env'

export function initPlausible(
  env: Pick<NextEnv, 'PLAUSIBLE_PROXY_ENDPOINT'>,
  config?: Omit<PlausibleConfig, 'endpoint'>
): ReturnType<typeof init> {
  import('@plausible-analytics/tracker').then(({ init }) => {
    init({
      domain: globalThis.location.hostname,
      endpoint: env.PLAUSIBLE_PROXY_ENDPOINT,
      autoCapturePageviews: true,
      outboundLinks: true,
      formSubmissions: true,
      bindToWindow: false,
      ...config,
    })
  })
}
