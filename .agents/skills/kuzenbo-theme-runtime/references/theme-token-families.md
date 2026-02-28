# Theme Token Families (Stable 0.0.6)

Primary CSS variable prefix: `--kb-*`

## Core UI tokens

- `--kb-background`, `--kb-foreground`
- `--kb-card`, `--kb-card-foreground`
- `--kb-popover`, `--kb-popover-foreground`
- `--kb-primary`, `--kb-primary-foreground`
- `--kb-secondary`, `--kb-secondary-foreground`
- `--kb-muted`, `--kb-muted-foreground`
- `--kb-accent`, `--kb-accent-foreground`
- `--kb-border`, `--kb-input`, `--kb-ring`
- `--kb-radius`, `--kb-cursor`

## Semantic feedback tokens

- `--kb-danger`, `--kb-danger-foreground`, `--kb-danger-border`
- `--kb-warning`, `--kb-warning-foreground`, `--kb-warning-border`
- `--kb-info`, `--kb-info-foreground`, `--kb-info-border`
- `--kb-success`, `--kb-success-foreground`, `--kb-success-border`

## Chart tokens

- `--kb-chart-1`
- `--kb-chart-2`
- `--kb-chart-3`
- `--kb-chart-4`
- `--kb-chart-5`

## Sidebar tokens

- `--kb-sidebar`, `--kb-sidebar-foreground`
- `--kb-sidebar-primary`, `--kb-sidebar-primary-foreground`
- `--kb-sidebar-accent`, `--kb-sidebar-accent-foreground`
- `--kb-sidebar-border`, `--kb-sidebar-ring`

## Layering and stacking tokens

- `--kb-z-underlay`, `--kb-z-behind`, `--kb-z-base`, `--kb-z-inline`
- `--kb-z-raised`, `--kb-z-elevated`, `--kb-z-floating`, `--kb-z-sticky`
- `--kb-z-overlay`, `--kb-z-toast-viewport`, `--kb-z-affix`, `--kb-z-toast`, `--kb-z-immersive`

## Tailwind-facing mapped tokens

`@kuzenbo/theme/default.css` maps `--kb-*` tokens to Tailwind-facing aliases such as:

- `--color-background`, `--color-foreground`, `--color-primary`, `--color-border`, `--color-ring`
- `--color-chart-1..5`
- `--color-danger|warning|info|success` (+ foreground/border variants)
- `--z-index-*`

## Utility

- `cursor-clickable` resolves to `cursor: var(--kb-cursor)`.
