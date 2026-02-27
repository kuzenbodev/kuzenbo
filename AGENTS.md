# AGENTS.md

Instructions for AI coding agents working with this codebase.

<!-- opensrc:start -->

## Source Code Reference

Source code for dependencies is available in `opensrc/` for deeper understanding of implementation details.

See `opensrc/sources.json` for the list of available packages and their versions.

Use this source code when you need to understand how a package works internally, not just its types/interface.

### Fetching Additional Source Code

To fetch source code for a package or repository you need to understand, run:

```bash
npx opensrc <package>           # npm package (e.g., npx opensrc zod)
npx opensrc pypi:<package>      # Python package (e.g., npx opensrc pypi:requests)
npx opensrc crates:<package>    # Rust crate (e.g., npx opensrc crates:serde)
npx opensrc <owner>/<repo>      # GitHub repo (e.g., npx opensrc vercel/ai)
```

<!-- opensrc:end -->

## Codebase Guide

### Documentation map

- Start at `_internal_docs/README.md`.
- Architecture and boundaries: `_internal_docs/architecture.md`.
- Monorepo dev workflow (package changes → website HMR): `_internal_docs/monorepo-dev-workflow.md`.
- Component implementation guide: `_internal_docs/components.md`.
- Hook implementation guide: `_internal_docs/hooks.md`.
- Release runbook: `_internal_docs/maintainer-release-flow.md`.
- Agent-specific workflow: `_internal_docs/ai-agents.md`.
- Contributor policy: `CONTRIBUTING.md`.

### Documentation audience policy

- Treat public documentation as consumer-facing by default.
- Public documentation includes the root `README.md`, package-level `README.md` files, and website docs content under `apps/website/content/docs/**` (rendered at `/docs/*`).
- Public documentation must focus on library adoption and usage (what it is, installation, requirements, API surface, examples relevant to users).
- Do not include maintainer/internal workflow content in public documentation (local Storybook operations, monorepo dev scripts, release workflow internals, CI/governance details not needed by consumers).
- Put contributor/maintainer/internal workflows in `_internal_docs/**`, `CONTRIBUTING.md`, and other internal runbooks.

### Repository layout

This repo is a Bun workspace + Turborepo monorepo:

- `apps/website`: Next.js 16 App Router app used as the website/playground (`next dev --port 3000`).
- Shared Storybook setup package: `packages/storybook`.
- Package-local Storybook wrappers: `packages/{core,charts,notifications,date,ai,code,datatable,tiptap,hooks}/.storybook`.
- `packages/ai`: AI-oriented UI/hooks/utils package (`@kuzenbo/ai`).
- `packages/charts`: Chart package (`@kuzenbo/charts`) extracted from core.
- `packages/core`: Main React UI library (`@kuzenbo/core`) built on Base UI + Tailwind Variants.
- `packages/code`: Code snippet primitives and hooks package (`@kuzenbo/code`).
- `packages/datatable`: Data table package (`@kuzenbo/datatable`) for TanStack Table composition.
- `packages/tiptap`: Rich text editor package (`@kuzenbo/tiptap`) for Tiptap-based editor components.
- `packages/date`: Date/calendar package (`@kuzenbo/date`) extracted from core.
- `packages/hooks`: Standalone hooks package (`@kuzenbo/hooks`) that must not depend on core.
- `packages/notifications`: Notification/toast package (`@kuzenbo/notifications`) extracted from core.
- `packages/storybook`: Shared Storybook configuration package (`@kuzenbo/storybook`) for package Storybook wrappers.
- `packages/cli`: CLI placeholder package (`@kuzenbo/cli`).
- `packages/mcp`: MCP server placeholder package (`@kuzenbo/mcp`).
- `packages/typescript`: Shared TypeScript presets (`base.json`, `react-library.json`, `nextjs.json`).
- `turbo.json` + package-level `turbo.json` tags: enforce monorepo-wide tag-based boundaries across packages and apps (including `apps/website`) through `turbo boundaries`.

### Toolchain and runtime

- Package manager: `bun@1.3.9`
- Task runner/orchestration: `turbo@2.8.7`
- React: `19.2.4`
- Next.js: `16.1.6`
- TypeScript: `5.9.3` (type-checking via `tsgo` from `@typescript/native-preview` — ~5x faster than `tsc`)
- Lint/format: Ultracite (`oxlint` + `oxfmt`)
- Unit/component tests: `bun test` + Testing Library + Happy DOM preload setup
- Storybook shared settings are configured in `@kuzenbo/storybook`, while wrappers remain package-local for UI/hooks packages.
- Storybook visual testing support is handled through package-local stories and local test workflows.

### Root commands

Run these from repo root:

- `bun install`
- `bun run dev` (Turbo dev across workspaces, persistent/no cache)
- `bun run build`
- `bun run storybook`
- `bun run build:storybook`
- `bun run typecheck`
- `bun run test`
- `bun run lint` (`ultracite check`)
- `bun run format` (`ultracite fix`)
- `bun run boundaries`
- `bun audit`
- `bun run release:status`
- `bun run release:changeset`
- `bun run release:notes`
- `bun run changeset:version`
- `bun run changeset:pre:enter -- <channel>`
- `bun run changeset:pre:exit`
- `bun run release:help`

Useful scoped Turbo invocation pattern:

- Prefer `bun <binary>` when the package is installed in the workspace.
- Use `bun x <binary>` (or `bunx <binary>`) only when the binary is not installed.
- `bun turbo run <task> --filter=<workspace>`
- Example: `bun turbo run test --filter=@kuzenbo/core`

### Package-level expectations

- `@kuzenbo/core`:
  - UI component package.
  - Component sources live under `packages/core/src/ui/<component>/`.
  - Typical folder pattern: implementation + `*.test.tsx` + `*.stories.tsx`.
  - Enforce one component per file maximum. Do not define multiple component implementations in the same source file; use dedicated files and compose through index/namespace modules.
  - Complex components may split scenarios into `tests/*.test.tsx` and `stories/*.stories.tsx`.
  - Public API is curated through `packages/core/src/index.ts`.
  - Depends on `@kuzenbo/hooks`.
- `@kuzenbo/hooks`:
  - Standalone hook package.
  - Hooks live under `packages/hooks/src/<hook-name>/`.
  - Enforce one hook per file maximum. Do not define multiple hook implementations in the same source file; use dedicated files.
  - Public API is curated through `packages/hooks/src/index.ts`.
  - Must not import `@kuzenbo/core` or core source paths.
- `@kuzenbo/charts`:
  - Chart primitives package extracted from core.
  - Sources live under `packages/charts/src/ui/primitives/` and `packages/charts/src/ui/prebuilt/`.
  - Public API is curated through `packages/charts/src/index.ts`.
- `@kuzenbo/notifications`:
  - Toast/notification package extracted from core.
  - Sources live under `packages/notifications/src/ui/toast/`.
  - Public API is curated through `packages/notifications/src/index.ts`.
- `@kuzenbo/date`:
  - Date/calendar package extracted from core.
  - Sources live under `packages/date/src/ui/calendar/`.
  - Public API is curated through `packages/date/src/index.ts`.
- `@kuzenbo/ai`:
  - AI-oriented UI/hooks/utils package.
  - Public API is curated through `packages/ai/src/index.ts`.
- `@kuzenbo/code`:
  - Code snippet primitives and hooks package.
  - May intentionally depend on `@kuzenbo/core` for shared code-centric UI composition.
  - One-way boundary is required: `@kuzenbo/code -> @kuzenbo/core` allowed, reverse `@kuzenbo/core -> @kuzenbo/code` denied.
  - Layering contract is required: `@kuzenbo/hooks <- @kuzenbo/core <- @kuzenbo/code`.
  - Public API is curated through `packages/code/src/index.ts`.
- `@kuzenbo/datatable`:
  - Data table UI/hooks/utils package.
  - Public API is curated through `packages/datatable/src/index.ts`.
- `@kuzenbo/tiptap`:
  - Rich text editor package for Tiptap-based editor components.
  - May intentionally depend on `@kuzenbo/core` primitives for shared editor UI composition.
  - Public API is curated through `packages/tiptap/src/index.ts`.
- `@kuzenbo/storybook`:
  - Shared Storybook configuration package for workspace wrappers.
  - Public API is curated through `packages/storybook/src/index.ts`.
- `@kuzenbo/cli`:
  - CLI tooling placeholder package.
  - Public API is curated through `packages/cli/src/index.ts`.
- `@kuzenbo/mcp`:
  - MCP tooling placeholder package.
  - Public API is curated through `packages/mcp/src/index.ts`.

### Package scope policy

- Active package scope includes `@kuzenbo/core`, `@kuzenbo/hooks`, `@kuzenbo/charts`, `@kuzenbo/notifications`, `@kuzenbo/date`, `@kuzenbo/ai`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/tiptap`, `@kuzenbo/storybook`, `@kuzenbo/styles`, `@kuzenbo/theme`, `@kuzenbo/cli`, and `@kuzenbo/mcp`.

### Release governance policy

- Publishing is manual-first and maintainer-controlled.
- Publishing is allowed only in GitHub Actions trusted publishing workflow (`.github/workflows/release.yml`).
- Non-dry-run (`dry_run=false`) release executions require explicit maintainer approval in GitHub Actions before publish steps proceed.
- When triggering a non-dry-run release via `gh workflow run`, agents must immediately notify the maintainer to approve the run manually and include the run URL.
- Do not add push/merge/tag-triggered publish automation.
- Release streams use a two-channel model: `next` (prerelease) and `stable`, both published from `main`.
- Channel and ref must match exactly: `next->main`, `stable->main`.
- Channel must be explicit (`next`, `stable`) for any release action.
- Lockstep versions across all `packages/*` are mandatory during releases.
- Version bumping and lockstep rewriting are handled through native Changesets CLI.
- In the current publish scope, only configured allowlist packages are publishable.
- `@kuzenbo/ai`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/date`, `@kuzenbo/cli`, `@kuzenbo/mcp`, and `@kuzenbo/tiptap` are blocked from publish until explicitly promoted.
- `@kuzenbo/storybook` and `@kuzenbo/website` are never-publish packages.
- Release process documentation lives in `_internal_docs/maintainer-release-flow.md`.

### Color primitives policy

- Use semantic color primitives from `@kuzenbo/core` across the entire monorepo.
- Prefer classes backed by core tokens such as `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`, and status primitives (`*-danger*`, `*-warning*`, `*-info*`, `*-success*`).
- Do not use raw Tailwind palette utilities like `text-gray-200`, `bg-slate-900`, `border-zinc-300`, `from-blue-500`, or similar color-scale classes.
- If a semantic color is missing, add/update tokens in `packages/theme/src/default.css` first, then consume them through semantic utilities.
- This rule applies to `packages/*`, `apps/*`, Storybook stories, tests, and docs examples.

### Typography primitives policy

- Prefer typography primitives/components from `@kuzenbo/core` for text rendering across the entire monorepo.
- Do not style raw HTML typography tags (`h1`-`h6`, `p`, `span`, `small`, etc.) with classname-driven typography when an equivalent core typography component exists.
- Raw HTML tags are allowed only when core typography primitives cannot satisfy a specific semantic or integration need (for example renderer constraints, third-party markup contracts, or rich-text interoperability).
- When a raw-tag fallback is used, keep styling minimal and document the reason inline.
- If a needed variant is missing, prefer extending core typography primitives first, then consume that API instead of duplicating ad-hoc typography classes.

### Base UI composition policy

- Use Base UI `render` prop composition for custom element rendering and slot composition.
- Do not introduce `asChild` in new code; treat it as a previous composition pattern, not a Base UI pattern.
- When touching existing `asChild` usage, migrate it to Base UI `render` unless a migration would cause a verified regression; if deferred, document the blocker.
- This rule applies to `packages/*`, `apps/*`, Storybook stories/tests, and docs examples.

### Tailwind Variants policy

- Treat `tailwind-variants` as the default variant architecture for `@kuzenbo/core` and extracted UI packages.
- Use `tv({ base, variants, defaultVariants, compoundVariants })` for single-root components; use `slots` for multi-part components.
- Prefer `compoundVariants` for cross-variant state styling. For slot-based components, pass per-slot overrides to `class`/`className` as an object.
- Prefer `compoundSlots` when the same classes must be applied to multiple slots to avoid class duplication.
- Prefer `extend` when composing from an existing `tv` component so `variants`, `slots`, `defaultVariants`, and `compoundVariants` stay inherited and typed.
- Preserve per-instance override ergonomics with `class`/`className`; do not add one-off variants when a call-site override is sufficient.
- Type variant props with `VariantProps<typeof componentVariants>`. If a variant must be required, enforce it with TypeScript utility types (`Omit` + `Required<Pick<...>>`).
- Use `cn` by default for class composition with conflict resolution. Use `cx` only when conflict resolution is intentionally not desired. Use `cnMerge` only when custom merge config is required.
- Keep imports on the original build (`tailwind-variants`) unless there is an explicit package-level decision to move to `/lite`; do not mix original and lite imports in the same workspace.
- For Tailwind CSS v4, do not use `responsiveVariants` config. Express responsive behavior directly in class strings (`sm:`, `md:`, `lg:`).
- Do not mutate `defaultConfig` in component files. If merge behavior needs customization, use a centralized shared wrapper via `createTV`.
- Workspaces using the original build must keep `tailwind-merge` installed and resolvable.
- Normalize size variant tokens to `xs | sm | md | lg | xl` (or the component-specific subset). Do not introduce `size=\"default\"`; use `size=\"md\"` as the baseline fallback token.
- Normalize destructive/severity variant tokens to `danger`. Do not introduce or reintroduce `error` as a style variant token.
- For Tiptap editor class override keys, use `classNames.group` (not `classNames.controlsGroup`).
- For tv refactors, preserve exact rendered class output for existing scenarios and state matrices unless a scoped migration explicitly defines a visual change.

### Naming convention policy

- Treat naming as a stable contract across source, tests, stories, docs, exports, and release tooling; avoid opportunistic churn.
- Use lowercase kebab-case for new file and folder names across `apps/**`, `packages/**`, and `scripts/**`.
- Keep package identity aligned: workspace folder slug, `package.json.name` suffix, and `turbo.json` tag must represent the same package slug.
- Keep package public entrypoints at `src/index.ts` and preserve subpath export naming parity with real file surfaces.
- Keep root script names in `package.json` in colon-delimited kebab-case segments: `<domain>:<action>[:<phase>]` (for example `release:dry-run`, `changeset:pre:enter`).
- Component and hook source filenames should mirror their subject slug (`button/button.tsx`, `use-mobile/use-mobile.ts`, `calendar-day-button.tsx`).
- For split component/hook parts, use `<subject>-<part>.ts(x)` names (for example `tiptap-editor-control.tsx`, `chart-tooltip-content.tsx`).
- Keep utility/factory filenames kebab-case and export verb-first camelCase functions (`create*`, `build*`, `normalize*`, `resolve*`, `get*`, `is*`, `to*`).
- Keep exported component symbols in PascalCase and hooks in `useCamelCase`.
- Keep exported type names in PascalCase; component props types must be `XProps`; hook helper types should default to `UseXOptions` and `UseXReturn`/`UseXResult`.
- Use `THIS_UPPER_CASE` only for real constants (static literals, registry maps, storage keys, CSS variable keys). Keep non-constant values/functions in camelCase.
- Keep locally declared Zod schema constants in PascalCase with `Schema` suffix; imported schema names are exempt.
- Keep `tv(...)` builders in lower-camel `*Variants`; avoid introducing new `*Style` builder names.
- Standardize tests on `*.test.tsx` (React/UI) and `*.test.ts` (non-UI logic/util/config). Do not introduce `*.spec.*`.
- Default tests to colocated placement; use `tests/` folders for integration or cross-file suites; keep package-level harness files named `setup.ts`.
- Keep stories on `*.stories.tsx` and shared story scaffolding on `*-story-shared.tsx`. Do not introduce `*.story.*`.
- Default story placement to `stories/` folders; colocated story exceptions are allowed only for existing chart prebuilt/primitives patterns.
- Keep one scenario export per new story file; split multi-export files when touched.
- Keep `-default` as the baseline story suffix for each public component/hook surface; additional scenarios should remain explicit (`-sizes`, `-complete-*`, etc.).
- Keep style/token naming normalized: `size` values use `xs | sm | md | lg | xl` (`md` baseline), and destructive/severity variant naming uses `danger` unless an explicit compatibility alias is required.
- Keep route/path slugs lowercase kebab-case in `apps/website`; represent hooks in route slugs as `use-*` and in symbols/docs API labels as `useX`.
- Preserve established filename suffixes by role: `.client.tsx`, `.types.ts`, `.definition.ts`, `.test.ts(x)`, `.stories.tsx`.
- Preserve framework-required naming exceptions: Next.js reserved exports remain lowercase (`metadata`, `viewport`, `dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`, `preferredRegion`, `maxDuration`, `manifest`, `robots`, `sitemap`), while HTTP route handlers stay uppercase (`GET`, `POST`, etc.).
- Preserve routing syntax exceptions when required by framework behavior: route groups `(group)`, private folders prefixed with `_`, and standards-driven dotted segments like `llms.txt`.
- Preserve existing public acronym/domain casing at the symbol layer (`Ai`, `Datatable`, `Tiptap`, `Mcp`) unless a dedicated migration is approved.
- If a package/path/name is renamed or removed, update all references in docs, stories, tests, and manifests in the same change; do not leave stale names.
- For large naming migrations, use TypeScript language-service symbol renames instead of regex/global find-replace, and run full quality gates before handoff.
- Enforce naming policy through code review and code edits. Do not add naming-specific lint/script/CI automation unless explicitly requested.

### Monorepo dev workflow

- UI-oriented packages use **source exports** in dev (`main`/`module` → `./src/*`).
- `apps/website` `transpilePackages` includes active UI packages (`@kuzenbo/core`, `@kuzenbo/hooks`, `@kuzenbo/charts`, `@kuzenbo/notifications`, `@kuzenbo/date`, `@kuzenbo/ai`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/tiptap`, plus theme/styles).
- `apps/website/styles/globals.css` `@source` includes core and extracted package sources for Tailwind v4 class scanning.
- No package watchers needed—edits in packages propagate to the website via HMR. Run `bun run dev` from root (or website-only). See `_internal_docs/monorepo-dev-workflow.md` for details.

### App notes (`apps/website`)

- Uses App Router with `cacheComponents: true` and `typedRoutes: true`.
- `next.config.ts` enables several experimental/perf flags; treat config changes carefully during upgrades.
- The app shell currently contains starter content (`app/page.tsx` is minimal), so this app is a safe place to add playground/docs pages for components.
- `apps/website` is a docs/playground runtime and must not contain direct test files (`*.test.*`, `*.spec.*`) or test harness directories (`tests/`, `__tests__/`).
- Enforce the website test policy with `bun run policy:no-website-tests` (included in `bun run lint`).

### Testing and quality workflow

- Prefer adding/maintaining colocated tests for component behavior.
- Do not add tests under `apps/website`; add coverage in the owning package workspace instead.
- Keep Storybook stories aligned with component API changes.
- For UI behavior tests, rely on Testing Library interactions (`userEvent`) instead of implementation details.
- Each package Storybook exposes a global toolbar theme switcher (`light` default, `dark` via `.dark` on preview `html`).
- Storybook testing stack includes `@storybook/addon-themes` and `@storybook/addon-a11y`.
- Prefer Storybook built-ins for QA passes: viewport controls, measure & outline, and `play`-function interaction tests.
- Run `bun ultracite fix` before finalizing to keep formatting/lint consistent with repo defaults.
- If `ultracite` is unavailable locally, use `bun x ultracite fix` (or `bunx ultracite fix`).
- Run `bun audit` before release-related handoff; treat reported vulnerabilities as release blockers unless explicitly approved by the maintainer.

### Agent guidance for this repo

- Start investigation in the owning package for the feature (`core`, `charts`, `notifications`, `date`, `ai`, `code`, `datatable`, `hooks`, `storybook`, `cli`, or `mcp`) unless the issue is clearly app-only.
- When changing shared behavior, check if `hooks` also needs updates.
- If adding new package surface area, mirror existing structure (tests + stories + explicit typing).
- For variantable styling work, follow the Tailwind Variants policy above (`tv`, `slots`, `compoundVariants`, `extend`, typed `VariantProps`).
- Preserve existing `class`/`className` override contracts when refactoring `tv` components.
- Prefer `extend` over manual result-string composition. If manual `base: [baseComponent(), ...]` composition is unavoidable, keep the base result first so later styles override intentionally.
- Enforce monorepo-wide tag boundaries with `bun run boundaries`.
- Preserve hooks standalone boundary in `turbo.json` tag rules.
- Preserve one-way code layering in `turbo.json`: allow `@kuzenbo/code -> @kuzenbo/core`, deny reverse `@kuzenbo/core -> @kuzenbo/code`.
- Do not commit generated artifacts unless explicitly requested.
- Parallelize by default: split work into independent tracks and run multiple subagents concurrently whenever safe.
- Optimize for maximum parallel throughput on medium/large tasks: research, implementation, and verification should run in parallel when dependencies allow.
- Assign explicit ownership per subagent (files/folders/tasks) to avoid overlap and merge conflicts.
- Keep one coordinator agent responsible for plan, synchronization, and final integration.
- Serialize only when a true dependency or safety risk exists; otherwise continue parallel execution.
- Before finalizing, reconcile all subagent outputs and run a single integrated validation pass for the touched scope.
- Mandatory self-review: after completing execution, each agent must review its output against the original plan and acceptance criteria.
- If outcomes differ from plan, the agent must either close the gap before handoff or explicitly document the deviation and rationale.
- When fixing issues, prioritize solving the actual root cause; avoid workaround-only or "hacky" fixes unless explicitly approved.
- If a reliable long-term fix is not found quickly, continue deeper investigation and research using Exa MCP or Context7 MCP before escalating.
- If still unsuccessful after thorough implementation and research, clearly report what is not working, why it is blocked, and propose concrete alternative solutions for user selection.
- For edits to public docs (`README.md`, package READMEs, website `/docs` content), optimize for external library users and remove internal-only guidance unless explicitly requested.

### Self-improvement and skill growth

- Agents must continuously learn while executing tasks across this codebase.
- Learning inputs must include: user conversations/feedback, recurring codebase patterns, debugging outcomes, and external research findings.
- Agents should proactively research unknown areas (prefer Exa MCP and Context7 MCP) and convert validated findings into reusable implementation guidance.
- When a repeatable workflow or pattern is discovered, update an existing skill or create a new skill in `.agents/skills/` (or `$CODEX_HOME/skills` when appropriate).
- Skill updates should be practical and specific: include trigger conditions, step-by-step workflow, and failure/verification signals.
- New or updated skills must reflect current repo conventions (boundaries, quality gates, package ownership, docs requirements) and avoid conflicting guidance.
- If a discovered pattern cannot be codified immediately, document it in the task handoff with a clear follow-up action for skill capture.

### External research policy

- Use Exa MCP as the default tool for website/internet search and general web research.
- Use Context7 MCP as the default tool for technical documentation/library/framework research; use Exa MCP as a fallback when needed.
- For tasks that require external research, documentation lookup, or website verification, start with Exa MCP and/or Context7 MCP before considering other methods.
- Avoid native web fetch tools and raw `curl`/`wget` for normal research workflows.
- Use native web fetch tools or raw `curl` only when Exa MCP/Context7 MCP are unavailable, insufficient for the task, or when the user explicitly requests a direct fetch; briefly document the reason when this fallback is used.

### Mandatory agent requirements

- Documentation updates are required with code changes.
- If an agent changes behavior, public API, developer workflow, build setup, package boundaries, or project structure, the agent must update relevant docs in the same change set.
- Relevant docs include `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, package READMEs, and files under `_internal_docs/`.
- Do not ship code changes that leave documentation stale.
- Component props export contract is required: every exported component symbol `X` must export a matching `XProps` type from the same module.
- Package entrypoint consistency is required: canonical component exports from `packages/*/src/index.ts` must include matching `type XProps` exports.
- Alias exports are exempt from alias props naming: for `X as Y` exports, keep canonical `XProps` and do not require `YProps` unless explicitly designed as first-class public API.
- Public docs scope enforcement is required:
- Root/package README files and website docs under `apps/website/content/docs/**` must remain consumer-facing.
- Internal contributor/maintainer workflows must be documented under `_internal_docs/**` or `CONTRIBUTING.md`, not in public docs.
- If internal-only instructions appear in public docs, agents must remove or relocate them.
- Any public install guidance for Kuzenbo UI packages that consume shared size/runtime utilities must explicitly state that `@kuzenbo/core` and `@kuzenbo/theme` should be paired in almost all app setups.
- Full quality validation is required after an agent finishes implementation and before handoff/final response.
- Run this required quality gate from repo root (or Turbo-equivalent scoped commands when explicitly requested): `bun run format`, `bun run lint`, `bun run typecheck`, `bun run test`, `bun run boundaries`, and `bun audit`.
- Do not finalize while any required quality check is failing unless the user explicitly approves shipping with known failures.
- If a required check cannot run (environment/tooling/time constraint), explicitly report what was skipped, why it was skipped, and the exact command the next agent/human should run.
- Color primitive compliance is required: reject or fix changes that introduce raw Tailwind palette color classes instead of `@kuzenbo/core` semantic tokens.
- Typography primitive compliance is required: reject or fix changes that use raw HTML typography tags with ad-hoc classnames when `@kuzenbo/core` typography components can be used.
- Base UI composition compliance is required: reject or fix changes that introduce `asChild`; use Base UI `render` prop composition instead.
- One component per file, one hook per file maximum is required: reject or fix changes that define multiple component or hook implementations in a single source file across the monorepo.
- Import style compliance is required: never use namespace imports like `React.ReactNode`, `React.FC`, or `React.forwardRef`. Always use direct named imports (e.g., `import { ReactNode, forwardRef } from "react"`). Apply the same rule to all external libraries—import types and symbols directly, not via namespace prefix.
- Tailwind Variants compliance is required: for variantable components, use `tv` with typed `VariantProps`, prefer `slots`/`compoundVariants`/`extend`, avoid `responsiveVariants`, and avoid unapproved `tailwind-variants/lite` imports.
- Classname placement compliance is required: keep class strings inline at JSX call sites (including `cn(...)` composition) or inside `tv(...)` definitions; do not store class payloads in constants (local or exported).
- Zod schema naming compliance is required: locally declared Zod schema constants must use PascalCase (for example `UserSchema` and `DocsSectionSchema`).
- Zod schema naming must be enforced through code review and code edits only; do not add CLI/script/lint/CI automation for this rule.

- Regression test coverage is required for discovered bugs.
- If an agent finds a bug/regression during implementation, review, or debugging, the agent must add or update a test that reproduces the issue and fails without the fix.
- After implementing the fix, the agent must ensure that regression test passes.
- If a regression test cannot be added (for example due to missing harness), the agent must explicitly explain the blocker and propose the exact test location and shape.

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun ultracite fix`
- **Check for issues**: `bun ultracite check`
- **Diagnose setup**: `bun ultracite doctor`

If `ultracite` is unavailable locally, use `bun x ultracite <command>` (or `bunx ultracite <command>`).

Oxlint + Oxfmt (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**

- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**

- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**

- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Oxlint + Oxfmt Can't Help

Oxlint + Oxfmt's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Oxlint + Oxfmt can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Oxlint + Oxfmt. Run `bun ultracite fix` before committing to ensure compliance.
If `ultracite` is unavailable locally, use `bun x ultracite fix` (or `bunx ultracite fix`).
