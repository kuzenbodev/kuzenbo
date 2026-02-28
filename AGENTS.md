# AGENTS.md

Instructions for AI coding agents working with this codebase.

<!-- opensrc:start -->

## Source Code Reference

Use `opensrc/` when you need dependency internals (not only public types).

- Package/version index: `opensrc/sources.json`
- Fetch additional source:

```bash
npx opensrc <package>           # npm (e.g. zod)
npx opensrc pypi:<package>      # PyPI
npx opensrc crates:<package>    # Rust
npx opensrc <owner>/<repo>      # GitHub repo
```

<!-- opensrc:end -->

## Codebase Guide

### Documentation Map

- Start: `_internal_docs/README.md`
- Architecture/boundaries: `_internal_docs/architecture.md`
- Monorepo dev workflow: `_internal_docs/monorepo-dev-workflow.md`
- Component guide: `_internal_docs/components.md`
- Hooks guide: `_internal_docs/hooks.md`
- Release runbook: `_internal_docs/maintainer-release-flow.md`
- Agent workflow: `_internal_docs/ai-agents.md`
- Contributor policy: `CONTRIBUTING.md`

### Public vs Internal Docs

- Public docs (`README.md`, package `README.md`, `apps/website/content/docs/**`) are consumer-facing.
- Keep maintainer/internal workflows in `_internal_docs/**` or `CONTRIBUTING.md`.
- Public install docs for UI packages using shared size/runtime utilities should state `@kuzenbo/core` + `@kuzenbo/theme` are usually paired.

## Repository Structure

Bun workspace + Turborepo monorepo.

- App: `apps/website` (Next.js 16 playground/docs runtime)
- UI packages: `@kuzenbo/core`, `@kuzenbo/charts`, `@kuzenbo/notifications`, `@kuzenbo/date`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/tiptap`, `@kuzenbo/ai`
- Platform packages: `@kuzenbo/hooks`, `@kuzenbo/styles`, `@kuzenbo/theme`, `@kuzenbo/storybook`, `@kuzenbo/typescript`, `@kuzenbo/cli`, `@kuzenbo/mcp`
- Boundaries enforced by `turbo.json` + package `turbo.json` tags (`bun run boundaries`)

### Package Rules

- `@kuzenbo/core`: components under `packages/core/src/ui/<component>/`, one component per file, exports curated in `packages/core/src/index.ts`.
- `@kuzenbo/hooks`: hooks under `packages/hooks/src/<hook>/`, one hook per file, must not import `@kuzenbo/core`.
- `@kuzenbo/code`: `@kuzenbo/code -> @kuzenbo/core` is allowed; reverse is denied.
- Extracted packages (`charts`, `notifications`, `date`, `datatable`, `tiptap`, `ai`) keep curated public entrypoints in `src/index.ts`.

## Toolchain and Core Commands

- Runtime/tooling: `bun@1.3.9`, `turbo@2.8.7`, React `19.2.4`, Next.js `16.1.6`, TS `5.9.3` (`tsgo`), Ultracite (`oxlint` + `oxfmt`)

Run from repo root:

- Core: `bun install`, `bun run dev`, `bun run build`, `bun run storybook`, `bun run build:storybook`
- Quality: `bun run format`, `bun run lint`, `bun run typecheck`, `bun run test`, `bun run boundaries`, `bun audit`
- Releases: `bun run release:status`, `bun run release:changeset`, `bun run release:notes`, `bun run changeset:version`, `bun run release:help`
- Scoped tasks: `bun turbo run <task> --filter=<workspace>`

Prefer `bun <binary>` when installed in workspace; use `bun x <binary>` only if needed.

## App Runtime (`apps/website`)

- App Router with `cacheComponents: true` and `typedRoutes: true`.
- Use as docs/playground runtime; do not add `*.test.*`, `*.spec.*`, `tests/`, or `__tests__/` under `apps/website`.
- Enforce with `bun run policy:no-website-tests` (included in lint).
- Package edits should flow via HMR (no package watchers required).

## Design and Composition Policies

### Color/Cursor/Typography

- Use semantic color tokens from core (e.g. `bg-background`, `text-foreground`); avoid raw Tailwind palette classes.
- Use `cursor-clickable` (token `--kb-cursor`) for shared interactive surfaces; avoid raw `cursor-pointer`.
- Prefer core typography primitives; avoid ad-hoc styled raw typography tags unless justified and documented inline.

### Base UI and Tailwind Variants

- Use Base UI `render` composition; do not introduce new `asChild`.
- For variantable components use `tv(...)` + typed `VariantProps`.
- Prefer `slots`, `compoundVariants`, `compoundSlots`, and `extend` for shared variant logic.
- Keep class overrides via `class`/`className`; avoid one-off variants when override is enough.
- Use `cn` by default (`cx` only when no merge is intended; `cnMerge` only for custom merge config).
- Stay on `tailwind-variants` (do not mix with `/lite` unless explicitly decided).
- Tailwind v4: avoid `responsiveVariants`; use `sm:`, `md:`, `lg:` in class strings.
- Keep normalized tokens: size `xs|sm|md|lg|xl` (`md` default), severity variant `danger` (not `error`).
- Tiptap editor override key: `classNames.group` (not `classNames.controlsGroup`).

## Naming and File Conventions

- Use lowercase kebab-case for files/folders in `apps/**`, `packages/**`, `scripts/**`.
- Keep package slug, `package.json.name`, and `turbo.json` tag aligned.
- Entry points stay at `src/index.ts`; keep export-path parity with real files.
- Component symbols: PascalCase; hooks: `useCamelCase`; props type contract: `XProps`.
- Tests: `*.test.tsx` (UI) / `*.test.ts` (non-UI); no `*.spec.*`.
- Stories: `*.stories.tsx`; shared story scaffold `*-story-shared.tsx`; one scenario export per new story file.
- `tv` builders should be `*Variants`; Zod schema constants should be PascalCase + `Schema`.
- Preserve framework-required exceptions (Next.js lowercase metadata exports, uppercase HTTP handlers, route groups `(group)`, `_private`, dotted routes like `llms.txt`).

## Release Governance

- Publishing is manual-first and maintainer-controlled.
- Publish only from GitHub Actions trusted publishing workflow: `.github/workflows/release.yml`.
- Non-dry-run (`dry_run=false`) requires explicit maintainer approval in GitHub Actions.
- If triggering non-dry-run via `gh workflow run`, immediately share the run URL and request approval.
- Do not add push/merge/tag auto-publish flows.
- Release channels: `next` and `stable`, both from `main` (`next->main`, `stable->main`).
- Lockstep versioning across all `packages/*` via Changesets.
- Never-publish: `@kuzenbo/storybook`, `@kuzenbo/website`.
- Blocked until promoted: `@kuzenbo/ai`, `@kuzenbo/code`, `@kuzenbo/datatable`, `@kuzenbo/date`, `@kuzenbo/cli`, `@kuzenbo/mcp`, `@kuzenbo/tiptap`.

## Agent Workflow

### Execution Rules

- Start in the owning package unless clearly app-only.
- Reuse existing implementations first; do not introduce duplicate logic/components/hooks/tests.
- Keep one component per file and one hook per file.
- Preserve class override contracts when refactoring variant systems.
- Do not commit generated artifacts unless explicitly requested.
- For public docs edits, optimize for library users and remove internal-only guidance.

### Multi-Agent Collaboration

- Parallelize independent work aggressively on medium/large tasks.
- Assign explicit ownership per subagent to avoid overlap.
- Keep one coordinator responsible for plan, integration, and final validation.
- Subagents do implementation only; coordinator runs repo-level quality gates.
- If final gates fail, split remediation by failing gate type, fix in parallel where safe, rerun failing checks, then run one full integrated pass.

### Research and Learning

- Default external research: Exa MCP.
- Technical docs/library research: Context7 MCP first, Exa MCP fallback.
- Use native web fetch/curl only when MCP tools are unavailable/insufficient or user explicitly requests it; document why.
- Capture repeatable workflows in `.agents/skills/` (or `$CODEX_HOME/skills`) with trigger, steps, and verification/failure signals.

## Mandatory Requirements Before Handoff

- Keep documentation in sync with code changes affecting behavior/API/workflow/build/boundaries/structure.
- Enforce component export contract: exported `X` must have matching `XProps`, and canonical package exports should include `type XProps`.
- Alias exports (`X as Y`) do not require `YProps` unless intentionally first-class.
- Run full root gates: `bun run format`, `bun run lint`, `bun run typecheck`, `bun run test`, `bun run boundaries`, `bun audit`.
- Do not finalize with failing required gates unless explicitly approved by maintainer/user.
- If a required check cannot run, report exactly what was skipped, why, and the exact next command.
- Enforce policy compliance in code review/code edits (not new lint/CI automation) for:
  - Color primitives (`@kuzenbo/core` semantic tokens, no raw palette classes)
  - Cursor primitives (`cursor-clickable`, no raw shared `cursor-pointer`)
  - Typography primitives usage
  - Base UI `render` composition over `asChild`
  - Direct named imports (no namespace style like `React.ReactNode`)
  - Tailwind Variants architecture rules
  - Class placement (inline JSX/`tv(...)`, not class constants)
  - Zod schema naming (PascalCase + `Schema`)
- If a bug/regression is found, add or update a regression test. If blocked, report blocker and exact proposed test location/shape.

## Ultracite Essentials

- Format: `bun ultracite fix`
- Check: `bun ultracite check`
- Doctor: `bun ultracite doctor`
- If local binary is missing: `bun x ultracite <command>`
- Linter/formatter catches most mechanical issues; still verify business logic, architecture, edge cases, and UX/accessibility.
