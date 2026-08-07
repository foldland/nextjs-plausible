import type { PlausibleRequestPayload } from '@plausible-analytics/tracker'

/**
 * Normalizes a Plausible event by removing the matched locale segment from the
 * URL path.
 *
 * If the request URL pathname starts with `/{locale}` for any provided locale,
 * this function:
 * - strips that locale segment from the pathname (yielding the canonical URL),
 * - returns an updated payload whose url is the canonical URL,
 * - sets the custom parameter Locale to the matched locale value.
 *
 * If no locale segment matches, the payload is returned unchanged.
 *
 * @param payload - The incoming Plausible request payload.
 * @param locales - List of locale path segments (e.g., `["en", "fr"]`).
 * @returns A transformed payload with canonicalized URL and custom parameter
 *          `Locale` when matched.
 */
export function transformLocale(
  payload: PlausibleRequestPayload,
  locales: ReadonlyArray<string>
) {
  const url = new URL(payload.u)

  for (const locale of locales) {
    const segment = `/${locale}`

    if (url.pathname.startsWith(segment)) {
      // Remove locale -> capture canonical url
      url.pathname = url.pathname.slice(segment.length)

      return {
        ...payload,
        u: url.href,
        p: {
          ...payload.p,
          Locale: locale,
        },
      }
    }
  }

  return payload
}
