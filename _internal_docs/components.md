# Building Components (`@kuzenbo/core` + extracted UI packages)

This guide describes how to add new components under `packages/core/src/ui`.

## Component Folder Pattern

Use one folder per component:

`packages/core/src/ui/<component-name>/`

Typical files:

- `<component-name>.tsx`
- `<component-name>.test.tsx`
- `stories/<component-name>-<scenario>.stories.tsx` (one scenario per file)
- `stories/<component-name>-story-shared.tsx` (shared Storybook metadata/helpers)
- optional split subcomponents (for compound APIs)

For larger APIs with many scenarios, keep dedicated folders:

- `stories/*.stories.tsx`
- `tests/*.test.tsx` (core/integration/style-contract split)

## Implementation Pattern

Common patterns in this repo:

- Base UI primitives for behavior.
- Tailwind Variants (`tv`) for variant styling.
- `cn` helper for class composition.
- Use `mergeBaseUIClassName` when composing Base UI `className` (string or callback) with base styles.
- Data-slot attributes for styling hooks and testability.
- Strong props typing with `ComponentProps` + `VariantProps`.

## Props Export Contract

- Every exported component symbol must export a matching props type with exact naming: `X` -> `XProps`.
- Export `XProps` from the same module that exports `X` (including compound/aggregate component modules).
- For aggregate modules that re-export subcomponents, re-export subcomponent prop types from the same aggregate module.
- Package entrypoints (`packages/*/src/index.ts`) must export canonical `type XProps` for canonical component exports.
- Public exports should use canonical component names only; avoid introducing alias component exports.

## Tailwind Variants Patterns

- Use `tv` as the canonical style contract for variantable components.
- For single-root components, prefer `base` + `variants` + `defaultVariants` + `compoundVariants`.
- For multipart components, use `slots` and return slot functions from `tv(...)`.
- Use `compoundVariants` for cross-variant combinations (for example `intent + size + state`), and use slot-object classes when targeting specific slots.
- Use `compoundSlots` when identical classes apply to multiple slots, instead of duplicating the same class payload in each slot.
- Prefer extending existing components with `extend` so inherited variants/slots/defaults remain typed and composable.
- Use result-string composition (`base: [baseComponent(), ...]`) only when `extend` cannot express the requirement; keep base output first so later classes override predictably.
- Preserve the consumer override contract: every variant function should allow `class`/`className` call-site overrides.
- Keep responsive behavior directly in class strings (`sm:`, `md:`, `lg:`). Do not use `responsiveVariants` with Tailwind CSS v4.
- Use `cn` as the default class combiner for conflict-aware merges. Use `cx` only when merge resolution is intentionally unnecessary. Use `cnMerge` only when you need custom merge config behavior.
- Keep class payloads inline at usage sites (including `cn(...)` composition) or inside `tv(...)` definitions; do not store class payloads in constants.
- Use `VariantProps<typeof componentVariants>` for typed component APIs. If a variant must be required, enforce it with utility types (`Omit` + `Required<Pick<...>>`).
- Normalize size tokens to `md` as the baseline variant value. Do not publish or consume `size=\"default\"`.
- Normalize destructive/severity tokens to `danger` across related component families.
- Keep variant ownership explicit: if a component exposes `variant`, variant intent classes must live in `variants.variant`; avoid encoding variant intent in `base` with selectors like `data-[variant=...]`.
- `data-variant` may remain on rendered elements for diagnostics and testability, but style behavior should not depend on those selectors when an explicit `variant` API exists.
- For Tiptap editor class override keys, use `group` instead of `controlsGroup`.
- For tv migrations/refactors, maintain exact class parity for existing covered scenarios unless a deliberate visual change is documented.

## Unified UISize System

All size-aware component families should share one contract from `packages/core/src/ui/shared/size/size-system.ts`.

- Canonical scale: `xs | sm | md | lg | xl`.
- Default token: `md`.
- Previous `size="default"` is previous; use `size="md"` in all source, stories, tests, and docs.
- Use shared helpers from `packages/core/src/ui/shared/size/resolve-size.ts` and `packages/core/src/ui/shared/size/size-context.ts` for inheritance-safe sizing.

Required precedence rule:

`explicit child size ?? nearest container/content size ?? component default ?? global provider default ?? "md"`

Global app-level runtime defaults are provided by `KuzenboProvider` from `@kuzenbo/core/provider`.

```tsx
import { KuzenboProvider } from "@kuzenbo/core/provider";

<KuzenboProvider
  components={{
    Input: {
      defaultProps: {
        size: "sm",
      },
    },
  }}
  defaultSize="lg"
  defaultRadius="0.75rem"
  reducedMotion
>
  {children}
</KuzenboProvider>;
```

Provider strictness is intentional: migrated size-aware component paths throw when `KuzenboProvider` is missing from the tree.

When a component supports inherited sizing, ensure each size-owning slot renders `data-size` so tests can assert the cascade.

Use `bun run size:verify` for a repo-level guard that checks forbidden `xxl`/`size="default"` usage and `data-size` coverage on size-aware slot owners.

## UISize Metric Families

Use these shared maps to keep density behavior consistent across families:

| Family             | Shared map                      | `xs`          | `sm`        | `md`        | `lg`          | `xl`        | Typical use                                         |
| ------------------ | ------------------------------- | ------------- | ----------- | ----------- | ------------- | ----------- | --------------------------------------------------- |
| Field height       | `FIELD_HEIGHT_CLASS_BY_SIZE`    | `h-6`         | `h-8`       | `h-9`       | `h-10`        | `h-11`      | Inputs, field controls, button-like controls        |
| Row height         | `ROW_HEIGHT_CLASS_BY_SIZE`      | `h-6`         | `h-7`       | `h-8`       | `h-9`         | `h-10`      | Tabs, toggles, item rows, menu rows                 |
| Compact visual box | `COMPACT_VISUAL_CLASS_BY_SIZE`  | `size-3`      | `size-3.5`  | `size-4`    | `size-[18px]` | `size-5`    | Checkbox/radio/switch tracks + indicators           |
| Compact hit target | `COMPACT_TARGET_SIZE_BY_SIZE`   | `24`          | `28`        | `32`        | `36`          | `40`        | Invisible tap target expansion for compact controls |
| Surface spacing    | `SURFACE_SPACING_CLASS_BY_SIZE` | `p-2 gap-1.5` | `p-3 gap-2` | `p-4 gap-3` | `p-5 gap-3.5` | `p-6 gap-4` | Card/dialog/item interior spacing                   |
| Field text         | `FIELD_TEXT_CLASS_BY_SIZE`      | `text-xs`     | `text-sm`   | `text-sm`   | `text-sm`     | `text-base` | Input-like controls                                 |
| Row text           | `ROW_TEXT_CLASS_BY_SIZE`        | `text-xs`     | `text-xs`   | `text-sm`   | `text-sm`     | `text-base` | Row/list/tab/toggle labels                          |
| Icon default       | `DEFAULT_ICON_CLASS_BY_SIZE`    | `size-3`      | `size-3.5`  | `size-4`    | `size-4`      | `size-5`    | Default icon sizing in control rows                 |

## Compact Control Exception

`Checkbox`, `Radio`, and `Switch` must follow the shared `UISize` scale, but they are intentionally not input-height-equal controls.

- Keep compact visuals on `COMPACT_VISUAL_CLASS_BY_SIZE`.
- Keep accessible tap/click reach via `COMPACT_TARGET_SIZE_BY_SIZE` and inset hit-area expansion.
- Do not force compact controls to field heights (`h-9`, `h-10`, etc.) just for visual alignment.
- Align mixed rows with layout wrappers (`flex items-center gap-*`) instead of stretching compact controls.

## UISize Migration Guide

Use this migration sequence whenever a component family moves to unified sizing:

1. Replace all `size="default"` usage with `size="md"`.
2. Convert local size unions to `UISize` unless intentionally constrained.
3. Apply precedence: `explicit child ?? nearest container/content ?? component default ?? global provider ?? "md"`.
4. Replace ad-hoc class math with shared family metrics.
5. Preserve compact-control exception for checkbox/radio/switch surfaces.

Example migration:

```tsx
// Before
<Tabs.List size="default">
  <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
</Tabs.List>

// After
<Tabs.List size="md">
  <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
</Tabs.List>
```

Context + child override example:

```tsx
<InputGroup size="lg">
  <InputGroup.Input placeholder="inherits lg" />
  <InputGroup.Button size="sm">Override</InputGroup.Button>
</InputGroup>
```

## Select-like Surface Size Cascade

For select-like families (`Select`, `Autocomplete`, `Combobox`, `Command`), size must be treated as one contract across control and popup/list/item surfaces.

- Canonical tokens: `xs | sm | md | lg | xl`.
- Use root-driven defaults (`size` on root) for both control and overlay descendants.
- When a content/popup wrapper exists (`Select.Content`, `Autocomplete.Content`, `Combobox.Content`), it is the nearest overlay size container.
- Child overrides remain optional and must always win over inherited size.
- Required precedence:
  - Control/input layers: `explicit child size ?? root size ?? global provider default ?? "md"`.
  - Overlay layers: `explicit child size ?? nearest content/container size ?? root size ?? global provider default ?? "md"`.
- Ensure testable contracts with `data-size` on size-owning wrappers (`root`, `content/popup`, `list`, `group`, `item`, `status/empty/label`, shortcut-like child slots).
- Avoid fixed-density popup classes that bypass size tokens (for example hardcoded item heights or list offset math not tied to size).

## Menu Surface Size Cascade

For menu families (`DropdownMenu` + `Menu` alias, `ContextMenu`, `Menubar`, `NavigationMenu`, `NavigationList*`, `SidebarMenu*`), size must stay synchronized between trigger/input surfaces and popup/item descendants.

- Canonical tokens: `xs | sm | md | lg | xl`.
- Default token: `md`.
- Root-driven contract: each family root exposes `size` and provides inherited size context.
- Overlay/content containers (for example `*.Content`) may override root size for descendants.
- Child-level `size` props remain optional and must win over inherited values.
- Required precedence:
  - Root/trigger surfaces: `explicit child size ?? root size ?? global provider default ?? "md"`.
  - Overlay descendants: `explicit child size ?? nearest content/container size ?? root size ?? global provider default ?? "md"`.
  - Navigation list descendants: `explicit slot size ?? item size ?? root size ?? global provider default ?? "md"`.
  - Sidebar descendants: `explicit child size ?? nearest SidebarMenu size ?? global provider default ?? "md"`.
- `NavigationList.Item collapsible` must use Base UI `Collapsible` primitives for disclosure semantics (trigger/panel wiring, keyboard behavior, and mounted-hidden panel handling).
- Add `data-size` on all size-owning wrappers so tests can assert the cascade contract.
- Keep sidebar icon-only collapsed stability: `SidebarMenuButton` keeps fixed icon box sizing in collapsed mode even when token size changes.

## Custom Docs Playground Pattern

When a docs page needs interactive controls (component playground pattern), use the
custom docs-playground system in `apps/website`:

- Create a component definition file in
  `apps/website/components/docs-playground/<component>/<component>-playground.definition.ts`.
- Create a preview renderer in
  `apps/website/components/docs-playground/<component>/<component>-playground-preview.client.tsx`.
- Create the playground entrypoint in
  `apps/website/components/docs-playground/<component>/<component>-playground.client.tsx`
  by composing `DocsPlayground` with the definition and preview component.
- Render the playground in MDX with
  `<ComponentPlayground />`.
- Keep control props intentionally curated for docs UX. Do not expose the full
  component prop surface by default.
- Keep generated code deterministic with `minimal` and `full` modes:
  `minimal` omits default-value props, `full` emits all controllable props.
- Keep playground shell styling semantic-token based (`bg-card`,
  `text-card-foreground`, `border-border`) and avoid raw Tailwind palette
  utilities.

## NumberField Composition Note

`NumberField` follows explicit Base UI composition in `@kuzenbo/core`.
It does not auto-compose labels, steppers, inputs, or scrub cursor content.
Compose required parts directly with:

- `NumberField`
- `NumberField.Group`
- `NumberField.Decrement`
- `NumberField.Input`
- `NumberField.Increment`
- optional `NumberField.ScrubArea` + `NumberField.ScrubAreaCursor`

Always provide an accessible name via `Label htmlFor` + `NumberField id` or
`aria-label` on `NumberField.Input`.
`className` supports both string and callback forms, and both are composed with
the default Kuzenbo NumberField classes.

## Layout Primitive: Container

Use `Container` for standard centered page-width layouts in app-level UIs.
The default utility contract is:

`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`

This keeps content centered with predictable responsive horizontal gutters
while still allowing `className` overrides for project-specific widths.

## Typography Primitive: Typography

Use the `Typography` namespace for baseline text semantics and consistent role
styles across the codebase.

- Semantic entries:
  `Typography.H1`..`Typography.H6`, `Typography.P`,
  `Typography.Blockquote`, `Typography.Ul`, `Typography.Ol`,
  `Typography.Li`
- Role aliases:
  `Typography.Display`, `Typography.Subheading`, `Typography.Body`,
  `Typography.Lead`, `Typography.Muted`, `Typography.Small`,
  `Typography.Caption`, `Typography.Overline`, `Typography.Eyebrow`,
  `Typography.Link`
- Configurable base primitives:
  `Typography.Heading` and `Typography.Text` (both support Base UI `render`
  prop polymorphism)

Default typography scales are intentionally context-neutral. Use `className`
overrides for responsive or page-specific sizing needs.

**Typography.Link** defaults to `<a>` with link styling (`text-primary`,
`underline-offset-4`, `hover:underline`). Use the `variant` prop for typography
scale (body, muted, caption, etc.). Use the `render` prop (e.g.
`render={<Link href="..." />}`) for framework routing.

## Code Primitive: Code

Use standalone `Code` from `@kuzenbo/core` for inline and block snippet display.

- Inline mode renders semantic `<code>` for short tokens and commands.
- `block` mode renders semantic `<pre>` for multiline snippets.
- `Code` intentionally does not include syntax highlighting.

## Color Primitive Rule

- Always use semantic color primitives from `@kuzenbo/core` tokens (examples: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-muted-foreground`).
- Do not use raw Tailwind palette classes like `text-gray-200`, `bg-slate-900`, `border-zinc-300`, `from-blue-500`, and similar scale-based color utilities.
- If you need a new color role, define it in `packages/theme/src/default.css` (`--token` and `--color-token`) before using it in component classes.
- Keep package CSS boundary-safe: `packages/theme/src/default.css` should define tokens/component primitives, while app-level global selectors (`html`, `body`, scrollbar behavior) belong in `packages/styles/src/recommended.css` or app stylesheets.

## Drawer Anatomy Note

`Drawer` in `@kuzenbo/core` follows Base UI anatomy and does not auto-compose
portal/backdrop wrappers anymore.

Use explicit composition:

`Drawer.Provider -> Drawer.IndentBackground -> Drawer.Indent -> Drawer.Root -> Drawer.Trigger -> Drawer.Portal -> Drawer.Backdrop -> Drawer.Viewport -> Drawer.Popup -> Drawer.Handle (optional) -> Drawer.Header (optional) -> Drawer.Content -> Drawer.Actions (optional)`

`Drawer.Overlay` and `Drawer.Footer` were removed as previous Vaul-oriented
parts. Prefer `Drawer.Backdrop` and `Drawer.Actions` for layout. Use
`Drawer.Header` for top-of-popup blocks (handle + title) when needed.

Drawer wrapper styles now expose docs-parity state and CSS-variable hooks for
swipe, snap points, nested stacks, and indent effects (`data-swiping`,
`data-starting-style`, `data-ending-style`, `data-nested-drawer-open`,
`data-nested-drawer-swiping`, `data-expanded`, and related `--drawer-*`
variables). Stories in `packages/core/src/ui/drawer/stories/` cover the full
Base UI drawer use-case matrix, with one story per file for easier ownership
and review.

### Drawer Popup Styling Guidance

`Drawer.Popup` includes behavior-critical defaults by design (swipe, snap
points, directional transforms, and nested stack state handling). For vertical
nested stacks, parent popups normalize to the frontmost height so stacked peeks
remain visible. Prefer adding visual-only classes with `className`.

```tsx
<Drawer.Popup className="group/popup shadow-lg">
  <Drawer.Content>Custom popup body</Drawer.Content>
</Drawer.Popup>
```

Avoid re-defining core transform, height, and nested stack behavior utilities
unless you intentionally want to replace the default drawer behavior contract.

## Chart API (Recharts v3)

`@kuzenbo/charts` now ships two layers:

- Primitive composition with `Chart.*` and direct Recharts integration.
- Prebuilt wrappers for common dashboard charts.
- Internal organization is component-centric: `packages/charts/src/ui/prebuilt/{area-chart,line-chart,bar-chart,scatter-chart,bubble-chart,composite-chart,donut-chart,pie-chart,funnel-chart,radar-chart,radial-bar-chart,sparkline,heatmap}` and domain-grouped primitives under `packages/charts/src/ui/primitives/*`.

Primitive namespace:

- `Chart.Provider`
- `Chart.Frame`
- `Chart.AutoSize`
- `Chart.Root`
- `Chart.Tooltip`
- `Chart.TooltipContent`
- `Chart.Legend`
- `Chart.LegendContent`
- `Chart.Style` (previous compatibility surface)
- `Chart.PortalTarget`
- `Chart.usePortalTarget`
- `Chart.useConfig`
- `Chart.useSeriesColor`
- `Chart.useSeriesColorVar`
- `Chart.useActiveTooltipLabel`
- `Chart.useActiveTooltipDataPoints`
- `Chart.useActiveTooltipCoordinate`
- `Chart.useIsTooltipActive`
- `Chart.usePlotArea`
- `Chart.useOffset`
- `Chart.useChartWidth`
- `Chart.useChartHeight`

Direct root imports from `@kuzenbo/charts` are available for `useSeriesColor` and `useSeriesColorVar`, while `Chart.useSeriesColor*` remains supported.

Prebuilt wrappers:

- `AreaChart`
- `LineChart`
- `BarChart`
- `ScatterChart`
- `BubbleChart`
- `CompositeChart`
- `DonutChart`
- `PieChart`
- `FunnelChart`
- `RadarChart`
- `Sparkline`
- `Heatmap`
- `RadialBarChart`

Series model and migration:

- `series[].name` is canonical for prebuilt wrappers.
- `series[].key` remains a migration alias in this phase.
- Prop migrations are `areaChartProps`, `lineChartProps`, `barChartProps`, `scatterChartProps`, `bubbleChartProps`, `composedChartProps`, `pieChartProps`, `funnelChartProps`, `radarChartProps`, `sparklineChartProps`, and `maxBarWidth`.
- `DonutChart` and `PieChart` removed top-level `innerRadius`/`outerRadius`; migrate to `size` (`DonutChart` also adds `thickness`) and use `pieProps` only for low-level overrides.

Radial migration highlights:

| Old prop                      | New canonical prop   | Scope        |
| ----------------------------- | -------------------- | ------------ |
| `innerRadius` + `outerRadius` | `size` + `thickness` | `DonutChart` |
| `innerRadius` + `outerRadius` | `size`               | `PieChart`   |

Namespace discovery for prebuilt wrappers:

- `Chart.Preset.Area`
- `Chart.Preset.Line`
- `Chart.Preset.Bar`
- `Chart.Preset.Scatter`
- `Chart.Preset.Bubble`
- `Chart.Preset.Composite`
- `Chart.Preset.Donut`
- `Chart.Preset.Pie`
- `Chart.Preset.Funnel`
- `Chart.Preset.Radar`
- `Chart.Preset.Sparkline`
- `Chart.Preset.Heatmap`
- `Chart.Preset.RadialBar`

Wrapper API references (props/types):

- `AreaChartProps`, `LineChartProps`, `BarChartProps`, `CompositeChartProps`
- `ScatterChartProps`, `BubbleChartProps`
- `DonutChartProps`, `PieChartProps`, `FunnelChartProps`, `RadarChartProps`
- `SparklineProps`, `HeatmapProps`

`Chart.Root` supports `responsiveContainerProps` so chart surfaces can tune
Recharts `ResponsiveContainer` behavior (for example `debounce`, `minHeight`,
or size constraints) without replacing Kuzenbo wrappers.

Use `Chart.Provider` + `Chart.Frame` + `Chart.AutoSize` directly when you need
full control over primitive composition without `Chart.Root` defaults.

Chart wrapper enhancements:

- `LineChart`: `type="gradient"`, `gradientStops`, `withPointLabels`, per-series `curveType`.
- `BarChart`: `type="default" | "stacked" | "percent" | "waterfall"`, `getBarColor`, `withBarValueLabel`.
- `CompositeChart`: `dotProps` + `activeDotProps` support across mixed line/area series.
- `enableLegendHighlight` defaults to `true` for prebuilt wrappers and dims non-highlighted series on legend hover.
- `type="waterfall"` in `BarChart` accepts raw delta values and computes cumulative ranges internally.

Prebuilt wrappers derive chart color variables from series metadata with this
fallback order:

- `series.theme`
- `series.color`
- `var(--color-chart-1..5)` cycle

Previous `hsl(var(--kb-chart-*)))` color inputs are normalized to
`var(--kb-chart-*)` for backward compatibility.

Use Recharts v3 interaction props (`defaultIndex`, `trigger`, `axisId`) through
`Chart.Tooltip` and use `portal` props for tooltip/legend when you want to
render overlays outside the chart tree.

Prefer `shape` and `content` customization for primitives and keep prebuilt
wrappers for fast dashboard composition.

## Tiptap Editor Primitives

`@kuzenbo/tiptap` now follows a layered composition model:

- Editor engine via `useKuzenboEditor`.
- Compound primitives via `TiptapEditor`.
- Feature helpers for mentions, slash commands, markdown adapters, and extension packs.

Primary composition parts:

- `TiptapEditor.Root`
- `TiptapEditor.Toolbar`
- `TiptapEditor.ControlsGroup`
- `TiptapEditor.Control`
- `TiptapEditor.Content`
- optional menus and controls (`LinkPopover`, `ColorPicker`, bubble/floating menus)

Use package CSS through `@kuzenbo/tiptap/styles.css` and keep semantic token
styling (`bg-background`, `text-foreground`, `border-border`) for all editor
surface overrides.

`RichTextEditor` has been removed. Use `useKuzenboEditor` with
`TiptapEditor` composition for all editor implementations.

## Minimal Scaffold

```tsx
import type { ComponentProps } from "react";
import { SomePrimitive } from "@base-ui/react/some-primitive";
import { cn, tv, type VariantProps } from "tailwind-variants";

const componentVariants = tv({
  base: "inline-flex items-center",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ExampleProps = ComponentProps<typeof SomePrimitive> &
  VariantProps<typeof componentVariants>;

export const Example = ({ className, variant, ...props }: ExampleProps) => (
  <SomePrimitive
    className={cn(componentVariants({ variant }), className)}
    data-slot="example"
    {...props}
  />
);
```

## Tests

Write behavior-oriented tests with Testing Library:

- renders expected semantics (`role`, labels, text)
- supports interaction callbacks
- handles disabled/error states
- passes through important props/attributes

Run tests for core:

Prefer `bun <binary>` for installed tools; use `bun x`/`bunx` only when not installed.

```bash
bun turbo run test --filter=@kuzenbo/core
bun turbo run test --filter=@kuzenbo/charts
bun turbo run test --filter=@kuzenbo/notifications
bun turbo run test --filter=@kuzenbo/date
```

## Stories

Create Storybook stories that cover:

- default state
- major variants
- interactive/edge cases
- size or layout variants where relevant

Story structure standard:

- one scenario per `*.stories.tsx` file
- exactly one named story export per `*.stories.tsx` file
- unique scenario titles using `<Group>/<Component>/<Scenario>`
- shared metadata (`argTypes`, `parameters`, `subcomponents`, helper demos) in
  `stories/<component-name>-story-shared.tsx`

### Story Quality Policy

- Do not create docs-only clone scenarios (for example wrappers based on `...DefaultStory` with no distinct behavior).
- Do not add empty `play` usage; keep `play` only when it runs meaningful interactions/assertions.
- Keep one canonical default story and at least one real-life use-case scenario per component.
- Keep stories offline-safe; avoid network-dependent mock assets and remote fetch-dependent fixtures.

Stories should make API intent obvious for contributors and consumers.

## Exporting Public API

After adding a new public component, export it from:

- `packages/core/src/index.ts`

Do not rely on deep imports from internal files for consumer API.

## Final Validation

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```
