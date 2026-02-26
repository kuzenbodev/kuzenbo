# Kuzenbo Architecture

This document explains how the monorepo is structured and why package boundaries are defined the way they are.

## Goals

- Keep `@kuzenbo/hooks` installable and usable on its own.
- Keep package ownership explicit (`core`, `theme`, `styles`, `charts`, `notifications`, `date`, `ai`, `code`, `datatable`, `tiptap`, `storybook`, `cli`, `mcp`).
- Keep build tooling explicit and repeatable.

## Repository Layout

- `apps/website`: Vinext-powered, Next.js API-compatible app for docs/playground with file-based docs pages under `/docs/**`.
- `apps/website` deployment note: Vercel builds run through Vinext + Vite with Nitro preset (`NITRO_PRESET=vercel vinext build`) and are staged to repo-root `.vercel/output` via `bun run build:vercel` (framework preset `Other` from `vercel.json`) to avoid `next build`/`.next` coupling.
- Shared Storybook setup package: `packages/storybook`.
- Package-local Storybook wrappers: `packages/{core,charts,notifications,date,ai,code,datatable,tiptap,hooks}/.storybook`.
- `packages/ai`: `@kuzenbo/ai` package for AI-related UI/hooks/utils.
- `packages/charts`: `@kuzenbo/charts` chart package (extracted from core).
- `packages/core`: `@kuzenbo/core` UI package.
- `packages/theme`: `@kuzenbo/theme` theme runtime + theme token package.
- `packages/styles`: `@kuzenbo/styles` optional global baseline styles package.
- `packages/code`: `@kuzenbo/code` package for code snippet primitives and hooks.
- `packages/datatable`: `@kuzenbo/datatable` package for table-oriented UI/hooks/utils.
- `packages/tiptap`: `@kuzenbo/tiptap` package for Tiptap-based rich text editor components.
- `packages/date`: `@kuzenbo/date` date/calendar package (extracted from core).
- `packages/hooks`: `@kuzenbo/hooks` standalone hooks package.
- `packages/notifications`: `@kuzenbo/notifications` toast/notification package (extracted from core).
- `packages/storybook`: `@kuzenbo/storybook` shared Storybook config package (internal).
- `packages/cli`: `@kuzenbo/cli` placeholder package.
- `packages/mcp`: `@kuzenbo/mcp` placeholder package.
- `packages/typescript`: shared tsconfig presets.
- `turbo.json` + package-level `turbo.json` tags: monorepo-wide guardrails that enforce tag-based boundaries across packages and apps, including `apps/website`.

## Documentation Runtime

- Public docs routes in `apps/website` are served by file-based App Router pages.
- Docs source content is authored as MDX and migrated into route-local `content.mdx` files under `apps/website/app/(docs)/docs/**`.
- Docs navigation and route metadata are defined in `apps/website/lib/docs/docs-manifest.ts`.
- Public docs URL contract is:
  - `/docs` for the docs index
  - `/docs/<slug>` for first-level pages
  - `/docs/<section>/<slug>` for nested pages
- Unknown `/docs/*` routes return standard 404 responses.

## Package Boundaries

- Monorepo tag boundaries are enforced with `bun run boundaries`.
- Tag coverage includes package workspaces and app workspaces (including `apps/website`).

### `@kuzenbo/hooks`

- Must not import `@kuzenbo/core`.
- Must not import core source paths.
- Runtime should stay lightweight and framework-local (React only through `peerDependencies`).
- Public API is defined in `packages/hooks/src/index.ts`.

### `@kuzenbo/core`

- Can depend on `@kuzenbo/hooks` through a normal semver dependency.
- Exposes UI surface from `packages/core/src/index.ts`.
- Exposes shared provider/runtime utilities from `@kuzenbo/core/provider` (`KuzenboProvider`, `useKuzenboContext`, `useComponentDefaultProps`, `useGlobalUISize`, `useComponentSize`).
- Keeps `@kuzenbo/core/size` as a compatibility export path for size-centric utilities while new provider integrations should prefer `@kuzenbo/core/provider`.
- Does not include chart/calendar/toast APIs (moved to dedicated packages).
- Does not ship a CSS subpath export.
- Consume base theme styles from `@kuzenbo/theme/prebuilt/kuzenbo.css`.
- Consume optional global baseline styles from `@kuzenbo/styles/recommended.css`.
- Migration note: `@kuzenbo/core/styles.css` was removed.
- Theme package CSS is boundary-safe: tokens + component styles only (no app-wide `html`/`body`/scrollbar globals).
- One-way boundary with code package: `@kuzenbo/core` must not depend on `@kuzenbo/code`.

### `@kuzenbo/code`

- Can depend on `@kuzenbo/core` through a normal semver/workspace dependency for code-centric UI composition.
- One-way boundary is required: `@kuzenbo/code -> @kuzenbo/core` allowed, reverse denied.
- Layering contract for shared UI logic: `@kuzenbo/hooks <- @kuzenbo/core <- @kuzenbo/code`.
- Public API is defined in `packages/code/src/index.ts`.
- `@uiw/react-codemirror` is intentionally retained as an internal dependency for interactive editor/playground behavior.
- Retention policy: keep the dependency while editing UX relies on it; do not treat it as a stable public API surface.

### Extracted UI packages

- `@kuzenbo/charts` exposes ready-made chart components through per-chart subpaths (for example `@kuzenbo/charts/ui/line-chart`, `@kuzenbo/charts/ui/bar-chart`, `@kuzenbo/charts/ui/composite-chart`).
- `@kuzenbo/charts`, `@kuzenbo/notifications`, `@kuzenbo/date`, `@kuzenbo/ai`, and `@kuzenbo/datatable` may depend on `@kuzenbo/core` for shared runtime size contracts when they expose size-aware surfaces.
- Internally, charts are grouped by responsibility: prebuilt component folders (`line-chart`, `bar-chart`, `composite-chart`) plus shared complete-chart internals, and primitives grouped by kernel domains (`root`, `provider`, `tooltip`, `legend`, `style`, `payload`, etc.).
- `@kuzenbo/notifications` exposes toast APIs from `packages/notifications/src/index.ts`.
- `@kuzenbo/date` exposes calendar APIs from `packages/date/src/index.ts`.

### Domain packages

- `@kuzenbo/ai`, `@kuzenbo/datatable`, and `@kuzenbo/tiptap` own package-specific UI/hooks/utils.
- `@kuzenbo/storybook` owns shared Storybook config, preview decorators, and preview CSS.
- `@kuzenbo/cli` and `@kuzenbo/mcp` are currently placeholder packages with minimal exports.
- UI-oriented package install guidance should treat `@kuzenbo/core` and `@kuzenbo/theme` as the default pair for runtime composition.

#### `@kuzenbo/tiptap` layering

- Engine layer: `useKuzenboEditor`, extension presets, capability guards, and markdown adapter utilities.
- Primitive UI layer: `TiptapEditor` compound API (`Root`, `Toolbar`, `ControlsGroup`, `Control`, `Content`, optional menus).
- Shared UI composition: `@kuzenbo/tiptap` intentionally depends on `@kuzenbo/core` for reusable primitives used by editor controls/menus.
- Feature helper layer: `createMentionExtension`, `createSlashExtension`, `createTaskListExtension`, `createLinkExtension`.
- Legacy wrapper removed: `RichTextEditor` is no longer exported; consumers should compose `useKuzenboEditor` + `TiptapEditor`.
- Styling contract: package-owned editor CSS is exported as `@kuzenbo/tiptap/styles.css` and must stay semantic-token based.

## Build Model

- Builder: `tsdown` for package workspaces.
- Module format: ESM-only.
- Multi-entry packages (`core`, `charts`, `notifications`, `date`) define explicit subpath entries in `tsdown.config.ts` + `publishConfig.exports`.
- Type declarations: generated by `tsdown` for package workspaces.
- Theme styles: copied by `tsdown` from `packages/theme/src/default.css` to `packages/theme/dist/default.css` during package build. Prebuilt themes copied from `packages/theme/src/prebuilt/` to `packages/theme/dist/prebuilt/`.
- Recommended global styles: emitted by `tsdown` from `packages/styles/src/recommended.css` to `packages/styles/dist/recommended.css` during package build.

## Release Architecture

- Release preparation is local and manual with root release scripts.
- Versioning is lockstep across all `packages/*` manifests.
- Only an explicit allowlist of packages is publishable in v1.
- Publishing runs only in GitHub Actions via workflow dispatch.
- Trusted Publishing is required (`id-token: write` and `npm publish --provenance`).
- Release artifacts are generated with `bun pm pack` and published from tarballs.
- Environment approval gate `npm-publish` is required before real publish.
- No push/merge/tag trigger is allowed to publish packages automatically.

### Release Surface Verification Notes

- Non-mutating baseline check: `bun run release:status`.
- Non-mutating packed-manifest check (publishable allowlist): `bun run release:dry-run -- --version <lockstep-version> --channel <next|stable> --ref main`.
- Source manifests may point to `src/*` for monorepo development/HMR; packed publish artifacts are rewritten via `publishConfig` and must resolve to `dist/*`.
- `src/*` references in packed manifests are treated as export leakage and must fail release validation.

## Local Quality Gates

Primary checks:

- `bun run format`
- `bun run lint`
- `bun run typecheck`
- `bun run test`
- `bun run build`
- `bun run boundaries`

Any package change should preserve these checks.
