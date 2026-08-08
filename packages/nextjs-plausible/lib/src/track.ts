import 'client-only'

import type { track as trackPlausible } from '@plausible-analytics/tracker'

/** Tracks an event, requires `initPlausible` to be called first. */
export function track(
  ...props: Parameters<typeof trackPlausible>
): ReturnType<typeof trackPlausible> {
  import('@plausible-analytics/tracker').then(({ track }) => {
    track(...props)
  })
}
