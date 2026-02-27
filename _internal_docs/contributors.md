# Contributor Guide

This is the practical path for shipping a change in Kuzenbo.

## Before You Start

Read these first:

- Repo contribution policy: [`../CONTRIBUTING.md`](../CONTRIBUTING.md)
- Architecture: [`./architecture.md`](./architecture.md)
- Components guide: [`./components.md`](./components.md)
- Hooks guide: [`./hooks.md`](./hooks.md)

## Local Setup

```bash
bun install
```

Useful commands:

```bash
bun run dev
bun run storybook
bun run build:storybook
bun run lint
bun run typecheck
bun run test
bun run build
bun run boundaries
```

## Storybook Theme + Testing

- Storybook is package-local for `core`, `charts`, `notifications`, `date`, `ai`, `code`, `datatable`, and `hooks`.
- Run all package Storybooks at once: `bun run storybook`.
- Run Storybook by package (example: `bun run --cwd packages/core storybook`).
- Use the Storybook toolbar theme switcher to validate both `light` (default) and `dark`.
- Dark mode is class-driven and applies `.dark` to the Storybook preview `html`.
- Storybook story surfaces use Kuzenbo theme tokens for background/foreground and keep native `color-scheme` in sync with the active theme.
- Storybook testing addons in this repo:
  - `@storybook/addon-themes`
  - `@storybook/addon-a11y`
- For behavior checks, prefer `play`-function interaction tests in stories.
- Story authoring standard: one scenario per `*.stories.tsx` file.
- Keep exactly one named story export per story file.
- Keep scenario files in a component/hook-local `stories/` folder with a `*-story-shared.tsx` helper module.
- Use unique Storybook titles per scenario with `<Group>/<Component>/<Scenario>`.

### Story Quality Policy

- Do not create docs-only clone scenarios (for example wrappers based on `...DefaultStory` with no distinct behavior).
- Do not add empty `play` usage; keep `play` only when it runs meaningful interactions/assertions.
- Keep one canonical default story and at least one real-life use-case scenario per component.
- Keep stories offline-safe; avoid network-dependent mock assets and remote fetch-dependent fixtures.

## Issues and Support

- File bugs, feature ideas, and docs updates using GitHub issue forms.
- Security issues must follow `../SECURITY.md` and stay private.
- General support and guidance live in `../SUPPORT.md`.

## Choose the Right Package

- Core UI component work: `packages/core`
- Chart component work: `packages/charts`
- Notification/toast work: `packages/notifications`
- Date/calendar work: `packages/date`
- React hook work: `packages/hooks`
- AI package work: `packages/ai`
- Code snippet package work: `packages/code`
- Data table package work: `packages/datatable`
- CLI placeholder work: `packages/cli`
- MCP placeholder work: `packages/mcp`
- Playground/site updates: `apps/website`
- Stories live in the owning package under `src/**/*.stories.tsx`

## Website Testing Policy

- `apps/website` must not contain direct test files (`*.test.*`, `*.spec.*`) or test harness folders (`tests/`, `__tests__/`).
- Validate this policy with `bun run policy:no-website-tests` (it is included in `bun run lint`).
- Add coverage for website-driven behavior in the owning package workspace (for example `packages/core` or `packages/hooks`) instead of `apps/website`.

## Typical PR Flow

1. Implement change in the right package.
2. Add or update tests.
3. Add or update Storybook stories.
4. Export from package root `src/index.ts` if public.
5. Run checks locally.

## Pre-PR Quality Gates

Run validation in two passes before opening a PR:

1. Validate only affected workspaces first.
2. Run full repo gates to catch cross-workspace regressions.

Quick checklist:

- Affected package checks pass (`lint`, `typecheck`, `test`, and any package Storybook checks when UI surface changed)
- Docs/stories/tests are updated with the behavior change
- Full repo gates pass from root (`format`, `lint`, `typecheck`, `test`, `boundaries`)
- No unexpected package boundary violations or public API export drift

Required full-gate commands:

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
```

## Migration Validation Sequence

Use this sequence for component migrations, package moves, or larger refactors:

1. Identify all touched workspaces (source package + direct dependents).
2. Run package-scoped checks for each touched workspace.
3. If UI packages changed, run package-scoped Storybook checks.
4. Run full repo quality gates from root.
5. Re-run changed package tests after conflict resolution/rebase.

Example package-scoped validation:

```bash
# Replace filters with touched workspaces
bun turbo run lint --filter=@kuzenbo/core --filter=@kuzenbo/hooks
bun turbo run typecheck --filter=@kuzenbo/core --filter=@kuzenbo/hooks
bun turbo run test --filter=@kuzenbo/core --filter=@kuzenbo/hooks

# UI migration example: run package Storybook locally
bun run --cwd packages/core storybook
bun run --cwd packages/core build:storybook
```

## Rules That Matter Most

- Hooks must stay standalone and cannot import core.
- Monorepo tag-based boundaries run through `turbo boundaries` (`bun run boundaries`) across packages and apps, including `apps/website`.
- Avoid deep source imports across package boundaries.
- Keep public APIs explicit via package root `src/index.ts`.
- Use semantic color primitives from `@kuzenbo/core` (`bg-background`, `text-foreground`, `border-border`, etc.) throughout the repo.
- Avoid raw Tailwind palette classes such as `text-gray-200`, `bg-slate-900`, `border-zinc-300`, and related scale-based color utilities.
- Preserve accessibility and semantic HTML in components.
- Prefer behavior-based tests over implementation details.

## Commit Messages

- Use Conventional Commits.
- Commit messages are enforced in a local `commit-msg` hook.
- Rules are defined in `commitlint.config.ts`.
- Header length is intentionally set to `200` characters to accommodate longer AI-assisted commit summaries.

## PR Checklist

- Package-scoped validation ran for touched workspaces first
- `bun run format` passes
- `bun run lint` passes
- `bun run typecheck` passes
- `bun run test` passes
- `bun run boundaries` passes
- Docs and checklists updated when workflow or OSS policies changed

## Helpful Storybook Features to Use

- Viewport controls for responsive component states.
- Measure & outline tools for alignment/spacing debugging.
- Interaction tests with `play` functions for user-flow verification.
- Accessibility checks through the a11y panel and Vitest integration.
