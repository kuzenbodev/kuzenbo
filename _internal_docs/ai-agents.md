# AI Agent Runbook

This file is the practical workflow for AI coding agents in this repository.

## Start Here

1. Read [`../AGENTS.md`](../AGENTS.md) for global rules.
2. Read [`./architecture.md`](./architecture.md) for package boundaries.
3. Read package-specific guides:
   - [`./components.md`](./components.md)
   - [`./hooks.md`](./hooks.md)

## Package Scope

Active package scope is currently:

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

## Key Constraints to Preserve

- Hooks must remain standalone.
- Hooks must not import core package or core source.
- Monorepo tag-based boundaries must stay valid across packages and apps (including `apps/website`).
- Package ownership should stay explicit (do not reintroduce chart/toast/calendar into core).
- Public APIs should be exposed through package root `src/index.ts`.
- Use `@kuzenbo/core` semantic color primitives across all code (`bg-background`, `text-foreground`, `border-border`, etc.).
- Do not introduce raw Tailwind palette classes (for example `text-gray-200`, `bg-slate-900`, `border-zinc-300`).
- If a color primitive is missing, add it in `packages/theme/src/default.css` first, then use the semantic token utility.
- Locally declared Zod schema constants must use PascalCase naming (for example `UserSchema` and `DocsSectionSchema`).
- Enforce Zod schema naming through code review and code edits only; do not add CLI/script/lint/CI automation for this rule.
- Use shared `UISize` for size-aware components (`xs | sm | md | lg | xl`) with `md` as default.
- Preserve the universal size precedence rule: `explicit child size ?? nearest size context ?? root size ?? "md"`.
- Use shared size metric families from `packages/core/src/ui/shared/size/size-system.ts` (field/row/compact/surface/text/icon maps) instead of ad-hoc class scales.
- Keep compact-control exception: checkbox/radio/switch remain compact controls and must not be forced to input-height parity.
- Migrate previous `size="default"` usage to `size="md"` in code, tests, stories, and docs.
- Run `bun run size:verify` before handoff on sizing migrations to catch `xxl` reintroduction, previous `size="default"`, and missing `data-size` on size-aware slot owners.
- If a select-like component (`Select`, `Autocomplete`, `Combobox`, `Command`) exposes `size`, all popup/list/item child surfaces must participate in the same size contract.
- For select-like surfaces, preserve precedence: `explicit child size ?? nearest content/container size ?? root size ?? "md"`.
- Reject fixed popup density hacks (for example hardcoded list offsets or row heights) when a tokenized size contract exists.
- If a menu-like component (`DropdownMenu`/`Menu`, `ContextMenu`, `Menubar`, `NavigationMenu`, `SidebarMenu*`) exposes `size`, popup/list/item/label/shortcut descendants must participate in the same size contract.
- For menu-like surfaces, preserve precedence: `explicit child size ?? nearest content/container size ?? root size ?? "md"` (or `SidebarMenu` root for sidebar menu descendants).
- Keep sidebar icon-only collapsed button box behavior fixed while still scaling expanded menu density.

## Tailwind Variants Checklist

- Use `tv` for variantable component styling. Use `slots` when a component has multiple stylable parts.
- Keep defaults in `defaultVariants` and cross-state styling in `compoundVariants`.
- Use `compoundSlots` when multiple slots need the same class payload.
- Prefer `extend` for composed components so variants, slots, defaults, and compound rules are inherited and typed.
- Preserve the `class`/`className` override contract for every `tv` surface.
- Type component variants with `VariantProps<typeof variants>`. Use TypeScript utility types when a variant must be required.
- Use `cn` by default for merge-aware class composition. Use `cx` only when merge behavior is intentionally not needed. Use `cnMerge` only when custom merge config is required.
- Keep class payloads inline at JSX call sites (including `cn(...)`) or inside `tv(...)` definitions; do not store class payloads in constants.
- Keep responsive behavior in class strings (`sm:`, `md:`, `lg:`). Do not use `responsiveVariants` with Tailwind CSS v4.
- Do not introduce `tailwind-variants/lite` in a workspace unless there is an explicit package-level decision and migration note.
- Keep `tailwind-merge` installed/resolvable for workspaces importing from `tailwind-variants`.
- Normalize size variants to `md` as the baseline token. Do not add `size=\"default\"`.
- Normalize destructive intent tokens to `danger`. Do not add mixed `error`/`danger` variant APIs in the same family.
- Keep variant ownership explicit: if a component exposes a `variant` prop, place variant intent styles in `variants.variant` instead of encoding them in `base` selectors like `data-[variant=...]`.
- `data-variant` attributes can stay for diagnostics/tests, but style behavior should not rely on those selectors when variant APIs exist.
- In Tiptap editor class overrides, use `classNames.group` (not `classNames.controlsGroup`).
- Treat tv migrations as class-contract work: keep exact class parity for covered existing scenarios and state matrices.

## Docs Workflow

- Treat file-based route pages under `apps/website/app/(docs)/docs/**` as the source of truth for docs rendering.
- Author docs page content in route-local `content.mdx` files (`page.tsx` + `content.mdx` per docs route).
- Preserve the public docs URL contract: `/docs`, `/docs/<slug>`, and `/docs/<section>/<slug>`.
- Keep docs navigation and canonical route metadata aligned with `apps/website/lib/docs/docs-manifest.ts`.
- Keep docs shell architecture centered on `apps/website/app/(docs)/docs/layout.tsx` and `apps/website/app/(docs)/docs/_components/docs-layout-chrome.client.tsx`.
- Do not use `@kuzenbo/core` `Sidebar*` primitives for the website docs shell; use the custom docs chrome component instead.
- Keep docs shell styling semantic-token based in `apps/website/styles/globals.css`.

## Safe Change Workflow

1. Inspect relevant files and existing patterns.
2. Implement changes in the narrowest package scope.
3. Update tests and stories when behavior or API changes.
4. Update docs when workflows or public APIs change.
5. Run validation commands before final response.

## Release Workflow (Agents)

For every version release, follow the no-skip checklist in [`./maintainer-release-flow.md`](./maintainer-release-flow.md):

- Use `## AI Agent Step-by-Step Release Checklist (No-Skip)` as the canonical sequence.
- Do not skip `bun audit`, `release:validate`, `release:notes`, or `release:dry-run`.
- Do not commit or push without explicit maintainer approval.
- Always request manual GitHub Actions approval for non-dry-run publish.
- If publish/tag succeeds but GitHub release creation fails, complete manual release recovery steps from the same checklist.

## Validation Commands

```bash
bun run format
bun run lint
bun run typecheck
bun run test
bun run boundaries
```

`bun run format` applies `oxfmt`, including Tailwind class sorting configured in `.oxfmtrc.jsonc`.

Use targeted turbo commands when you only changed one workspace, then run broader checks if shared packages were affected.

## Storybook Testing and Theme Notes

- Shared Storybook settings live in `@kuzenbo/storybook`.
- Storybook wrappers stay package-local for `core`, `charts`, `notifications`, `date`, `ai`, `code`, `datatable`, and `hooks`.
- Run all package Storybooks at once: `bun run storybook`.
- Run Storybook by package (example: `bun run --cwd packages/core storybook`).
- Each package Storybook uses a global light/dark toolbar switcher backed by `@storybook/addon-themes`.
- Default Storybook theme is `light`; dark mode applies `.dark` to preview `html`.
- Preview `color-scheme` plus story surface background and foreground are synced to Kuzenbo theme tokens.
- Storybook uses stories and addons (`addon-a11y`, `addon-themes`) for component QA.

## Helpful Storybook QA Features

- Viewport controls for responsive verification.
- Measure & outline tools for spacing and alignment checks.
- `play`-function interaction tests for realistic user flows.
- a11y checks in the addon panel.

## Files Agents Should Treat as Source of Truth

- Root scripts and workspace config: `package.json`, `turbo.json`
- Package manifests: `packages/*/package.json`
- Package public APIs: `packages/*/src/index.ts`
- Boundary guard config: root `turbo.json` plus package/app `turbo.json` tags
