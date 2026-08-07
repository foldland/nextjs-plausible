import 'client-only'

import { track as trackPlausible } from '@plausible-analytics/tracker'

/** Tracks an event, requires `initPlausible` to be called first. */
export function track(
  ...props: Parameters<typeof trackPlausible>
): ReturnType<typeof trackPlausible> {
  // biome-ignore lint/style/useGlobalThis: If not checked the prerender will call track and fail
  if (typeof window !== 'undefined') {
    trackPlausible(...props)
  }
}
