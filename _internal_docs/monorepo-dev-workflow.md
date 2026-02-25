# Monorepo Dev Workflow: Package Changes Propagation

This guide explains how package changes propagate across the workspace during local development.

## Dev Model Summary

- UI-oriented workspace packages are consumed from source during development.
- `apps/website` transpiles workspace packages and reflects changes through HMR.
- No separate package watcher process is required for day-to-day component/hook edits.

## What Makes It Work

- `apps/website/next.config.ts` includes active UI workspace packages in `transpilePackages` (`@kuzenbo/core`, `@kuzenbo/hooks`, `@kuzenbo/charts`, `@kuzenbo/notifications`, `@kuzenbo/date`, `@kuzenbo/ai`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/tiptap`, plus theme/styles).
- `apps/website/styles/globals.css` includes `@source` paths for core and extracted UI package sources so Tailwind can discover classes.
- Turbo workspace orchestration keeps build/test/dev commands aligned across apps and packages.
- Turbo tag rules enforce monorepo-wide boundaries across package and app workspaces (including `apps/website`).

## Recommended Local Flow

From repo root:

```bash
bun install
bun run dev
```

During implementation:

```bash
bun run lint
bun run typecheck
bun run test
bun run boundaries
```

## Package-Scoped Validation

Use package-scoped checks first for faster feedback during implementation or migration work.

```bash
bun turbo run test --filter=@kuzenbo/core
bun turbo run test --filter=@kuzenbo/hooks
bun turbo run test --filter=@kuzenbo/charts
bun turbo run test --filter=@kuzenbo/notifications
bun turbo run test --filter=@kuzenbo/date
bun turbo run test --filter=@kuzenbo/ai
bun turbo run test --filter=@kuzenbo/datatable
bun turbo run test --filter=@kuzenbo/code
bun turbo run test --filter=@kuzenbo/tiptap
```

You can also scope lint/typecheck the same way:

```bash
bun turbo run lint --filter=@kuzenbo/core
bun turbo run typecheck --filter=@kuzenbo/core
```

## Storybook Run and Build Workflow

Run all Storybooks from repo root:

```bash
bun run storybook
```

Build static Storybook bundles from repo root:

```bash
bun run build:storybook
```

Run or build a specific package Storybook when validating a focused UI change:

```bash
bun run --cwd packages/core storybook
bun run --cwd packages/core build:storybook
```

Maintainer recommendation:

1. Run package-scoped tests while iterating.
2. Run package Storybook for touched UI packages.
3. Run `bun run build:storybook` before final PR handoff when stories changed.
4. Finish with full repo gates (`format`, `lint`, `typecheck`, `test`, `boundaries`).

## Troubleshooting HMR

If package edits do not appear in `apps/website`:

1. Restart `bun run dev`.
2. Confirm the edited package is included in `transpilePackages`.
3. Confirm the edited files are inside exported source paths.
4. Re-run `bun run typecheck` to catch stale type errors blocking updates.

## Monorepo Contributor Note: Next.js + Kuzenbo from Source

If you are developing Kuzenbo packages from source in the same workspace as `apps/website`, include package names in `transpilePackages` and expose source paths for Tailwind class scanning. For normal npm consumption, this step is not required.

## Guardrails to Keep

- Keep monorepo tag boundaries clean (`bun run boundaries`).
- Keep package public APIs explicit via `packages/*/src/index.ts`.
- Keep docs and stories in sync with behavior changes.
