# Building Hooks (`@kuzenbo/hooks`)

This guide explains how to add hooks while keeping `@kuzenbo/hooks` standalone.

## Non-Negotiable Boundary Rules

- Hooks cannot import `@kuzenbo/core`.
- Hooks cannot import core source paths.
- Hooks should stay lightweight and only depend on React peer APIs.
- Public exports in hooks must be hook-related only.

Boundary enforcement command (Turbo Boundaries):

```bash
bun run boundaries
```

## Hook Folder Pattern

Create hooks under:

`packages/hooks/src/<hook-name>/`

Typical files:

- `<hook-name>.ts`
- `<hook-name>.test.ts`
- `stories/<hook-name>-<scenario>.stories.tsx` (one scenario per file)
- `stories/<hook-name>-story-shared.tsx` (shared Storybook metadata/helpers)
- optional `index.ts` for local re-export consistency

Root-level `<hook-name>.stories.tsx` files are not part of the current standard.

## Minimal Hook Scaffold

```ts
import { useEffect, useState } from "react";

export const useFeatureFlag = (defaultValue = false) => {
  const [enabled, setEnabled] = useState(defaultValue);

  useEffect(() => {
    // hook side-effects
  }, []);

  return { enabled, setEnabled };
};
```

Then export from:

- `packages/hooks/src/index.ts`

## Hook Testing Pattern

Use `renderHook` and `act` from Testing Library.

Test for:

- initial state correctness
- state transitions
- side-effect wiring and cleanup
- boundary/edge cases

Run only hooks tests:

Prefer `bun <binary>` for installed tools; use `bun x`/`bunx` only when not installed.

```bash
bun turbo run test --filter=@kuzenbo/hooks
```

## Storybook for Hooks

Hook stories should provide a small visual demo component that:

- calls the hook
- displays current hook output
- lets users trigger state changes

When a hook has multiple scenarios, keep one named story export per
`*.stories.tsx` file and place shared Storybook metadata or reusable demo
helpers in `stories/<hook-name>-story-shared.tsx`.

This keeps docs and behavior discoverable.
