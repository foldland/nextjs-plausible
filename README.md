# @foldland/nextjs-plausible-meta

A slim wrapper for using [plausible analytics](https://plausible.io) inside [nextjs](https://nextjs.org).

Next.js provides [`instrumentation-client.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client)
for monitoring, analytics code, and other side-effects that run before the application becomes interactive.

## Install

Add this to your `.npmrc`:

```
@foldland:registry=https://npm.registry.foldland.io/
```

or ensure your `pnpm-workspace.yaml` contains the following:

```yaml
registries:
  default: https://registry.npmjs.org/
  "@foldland": https://npm.registry.foldland.io/
```

```bash
pnpm add @foldland/nextjs-plausible
```

## Usage

Assuming the project makes use of `@t3-oss/env-nextjs` for environment variable
validation extend the provided preset.

If you don't want to use the environment validation specify the needed `env`
configuration manually.

**`src/env.ts`**

You SHOULD add the `plausibleNextjs()` to your `env` validation.

```ts
import { plausibleNextjs } from '@foldland/nextjs-plausible/config/zod'
import { vercel } from '@t3-oss/env-nextjs/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  /* ... */
  extends: [vercel(), plausibleNextjs()],
  /* ... */
})
```

```ts
import { withPlausible } from '@foldland/nextjs-plausible'
import type { NextConfig } from 'next/types'
import { env } from '@/env.ts'

let config: NextConfig = {
  /* ... */
}


// with env validation (recommended)
config = withPlausible(env)(config)

// custom setup
config = withPlausible({
  PLAUSIBLE_PROXY_ENDPOINT: '/api/v1/plausible-proxy'
  PLAUSIBLE_URL: 'https://analytics.example.com'
})(config)

export default config
```


**`src/instrumentation-client.ts`**

You MUST initialize the plausible tracker by calling `initPlausible` in your
client side instrumentation.

```ts
import 'client-only'

import { initPlausible } from '@foldland/nextjs-plausible'
import { env } from './env'

// with env validation (recommended)
initPlausible(env, { /* override config */})

// custom setup
initPlausible({
  PLAUSIBLE_PROXY_ENDPOINT: '/api/v1/plausible-proxy'
})
```

**`src/something-to-track.ts`**:

Call `track` track a custom event.


```ts
'use client'

import { track } from '@foldland/nextjs-plausible'


export function TrackComponent() {
  return (
    <button
      onClick={() => track('event-name', {})}
      type="button"
    >
      Track an event
    </button>
  )
}
```


## Why not next-plausible?

The [next-plausible](https://github.com/4lejandrito/next-plausible) package is
a great project for using plausible analytics in your nextjs project.

We've used it for the past few years in all of our projects but have begun
seeing a few limitations of it's design:

1. The plausible script is not bundled with the app code
2. Complicated setup with the plausible proxy.
3. Higher bundle size and request count

This package is fairly opinionated and provides an easy way to setup plausible.
**next-plausible** is still a great option if a different approach is required.
