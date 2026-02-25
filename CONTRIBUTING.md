# Contributing

Thanks for helping improve Kuzenbo.

## Read First

- Project docs index: [`./_internal_docs/README.md`](./_internal_docs/README.md)
- Architecture: [`./_internal_docs/architecture.md`](./_internal_docs/architecture.md)
- Contributor workflow: [`./_internal_docs/contributors.md`](./_internal_docs/contributors.md)
- Component guide: [`./_internal_docs/components.md`](./_internal_docs/components.md)
- Hook guide: [`./_internal_docs/hooks.md`](./_internal_docs/hooks.md)

## Prerequisites

- Node.js `>=20.19.0`
- Bun `1.3.9`

## Setup

```bash
bun install
```

## Development Commands

```bash
bun run dev
bun run build
bun run storybook
bun run build:storybook
bun run test
bun run typecheck
bun run lint
bun run format
bun run boundaries
```

## Storybook Workflow

- Shared Storybook settings are maintained in `packages/storybook`.
- Storybook wrappers remain package-local for UI/hooks packages (`core`, `charts`, `notifications`, `date`, `ai`, `code`, `datatable`, `hooks`).
- Run all package Storybooks at once: `bun run storybook`.
- Run a package Storybook directly, for example:
  - `bun run --cwd packages/core storybook`
  - `bun run --cwd packages/hooks storybook`
- Package ports are fixed (`6101` through `6107`) so you can run multiple Storybooks at once.
- Every package Storybook includes:
  - global theme switcher backed by `@storybook/addon-themes`
  - `light` (default) and `dark`, with `.dark` applied on preview `html`
  - preview `color-scheme` plus story canvas/docs-story surfaces synchronized to Kuzenbo tokens (`--kb-background`, `--kb-foreground`)
  - `@storybook/addon-a11y` for accessibility checks
- Prefer writing interactive stories with `play` functions for behavior coverage.
- Story authoring standard: keep one scenario per `*.stories.tsx` file.
- Story files should have exactly one named story export.
- Keep scenario files under a component/hook-local `stories/` folder and use a `*-story-shared.tsx` module for shared metadata/helpers.
- Use unique Storybook titles per scenario in `<Group>/<Component>/<Scenario>` format.

## Local Quality Workflow

Run these before opening a PR:

- `bun run format`
- `bun run lint`
- `bun run typecheck`
- `bun run test`
- `bun run build`
- `bun run boundaries`

## GitHub CI Expectations

- GitHub Actions workflow `.github/workflows/ci.yml` runs on `pull_request` for `main` and supports manual `workflow_dispatch`.
- CI runs a single `Quality` job that executes shared `ci:quality` commands (audit, lint, typecheck, test, boundaries, build) after one shared setup/install.
- CI restores Bun cache (`~/.bun/install/cache`) and Turborepo cache (`.turbo/cache`) for faster reruns.
- Optional remote Turbo cache can be enabled via repo secret `TURBO_TOKEN` and repo variable `TURBO_TEAM`.
- Branch protection should require only `CI / required`.
- `CI / required` passes only when all quality jobs pass.
- Publishing is not part of CI and remains manual-only in `.github/workflows/release.yml`.

## Release Governance

- Publishing is maintainer-only and manual by design.
- Versions are lockstep for all `packages/*` during releases.
- Release streams use a two-channel model: `next` (prerelease) and `stable`, both from `main`.
- Version bumping is handled with native Changesets CLI.
- Publishing is allowed only through GitHub Actions trusted publishing workflow.
- Default behavior requires explicit channel selection (`next`, `stable`).
- Channel and publish ref must match (`next->main`, `stable->main`).
- Maintainer helpers: `bun run release:changeset`, `bun run changeset:version`, `bun run release:notes`, `bun run release:validate`.
- Full runbook: [`./_internal_docs/maintainer-release-flow.md`](./_internal_docs/maintainer-release-flow.md)

## Issue and Pull Request Workflow

- Use GitHub issue forms for bugs, features, and docs improvements.
- Blank issues are disabled to keep reports structured and actionable.
- Use `SECURITY.md` for vulnerability reporting and `SUPPORT.md` for help.
- Pull requests use `.github/pull_request_template.md`; complete the checklist.

## Commit Message Policy

- Commit messages must follow Conventional Commits.
- Validation runs locally through a Git `commit-msg` hook.
- Rules are defined in `commitlint.config.ts`.
- Commit header length is relaxed to `200` characters to support longer AI-assisted commit summaries.

## Package Scope

Current active package scope:

- `@kuzenbo/ai`
- `@kuzenbo/charts`
- `@kuzenbo/core`
- `@kuzenbo/theme`
- `@kuzenbo/styles`
- `@kuzenbo/code`
- `@kuzenbo/datatable`
- `@kuzenbo/date`
- `@kuzenbo/hooks`
- `@kuzenbo/notifications`
- `@kuzenbo/storybook`
- `@kuzenbo/cli`
- `@kuzenbo/mcp`

## Implementation Guidelines

- Build core components in `packages/core/src/ui/*` and export through `packages/core/src/index.ts`.
- Build chart components in `packages/charts/src/ui/*` and export through `packages/charts/src/index.ts`.
- Build notification components in `packages/notifications/src/ui/*` and export through `packages/notifications/src/index.ts`.
- Build date components in `packages/date/src/ui/*` and export through `packages/date/src/index.ts`.
- Build package-specific hooks in their owning package (`packages/hooks`, `packages/ai`, `packages/code`, `packages/datatable`) and export through package `src/index.ts`.
- Build package-specific utilities in their owning package (`packages/ai`, `packages/code`, `packages/datatable`, `packages/cli`, `packages/mcp`) and export through package `src/index.ts`.
- Hooks must remain standalone and cannot import `@kuzenbo/core` or core source paths.
- Monorepo tag-based boundaries are enforced through `turbo boundaries` (`bun run boundaries`), including app tags such as `apps/website`.
- Keep tests and stories updated with behavior/API changes.

## Pull Request Checklist

- Tests added or updated when behavior changes
- `bun run lint`, `bun run typecheck`, and `bun run test` pass
- Commit message follows Conventional Commits (enforced by local hook)
- Monorepo boundary guard passes (`bun run boundaries`)
- Docs updated when behavior, workflow, or OSS policy changed

## Recommended Storybook Testing Features

- Addon stack already in this repo:
  - `@storybook/addon-themes`
  - `@storybook/addon-a11y`
- Built-in Storybook helpers worth using in story reviews:
  - Viewport controls for responsive states.
  - Measure & outline tools for spacing/alignment debugging.
  - Interaction testing via `play` functions and `storybook/test`.
