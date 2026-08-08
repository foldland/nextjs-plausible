import 'client-only'

import { init, type PlausibleConfig } from '@plausible-analytics/tracker'
import type { NextEnv } from './env'

export function initPlausible(
  env: Pick<NextEnv, 'PLAUSIBLE_PROXY_ENDPOINT'>,
  config?: Omit<PlausibleConfig, 'endpoint'>
): ReturnType<typeof init> {
  init({
    domain: globalThis.location.hostname,
    endpoint: env.PLAUSIBLE_PROXY_ENDPOINT,
    autoCapturePageviews: true,
    outboundLinks: true,
    formSubmissions: true,
    bindToWindow: false,
    ...config,
  })
}
