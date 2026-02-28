# Styles Entrypoints and Behavior (Stable 0.0.6)

## Public CSS entrypoints

- `@kuzenbo/styles/recommended.css`
- `@kuzenbo/styles/styles.css` (alias to the same baseline)

## What baseline styles include

- Token-aligned border/ring defaults (`border-border`, ring alignment)
- Focus-visible outlines with fallback for browsers without `:focus-visible`
- Selection colors via variables:
  - `--kb-selection-background`
  - `--kb-selection-foreground`
- Scroll behavior and accessibility:
  - reduced-motion aware smooth scrolling
  - scroll lock compatibility (`html[data-base-ui-scroll-locked]`)
- Sticky-anchor support via:
  - `--kb-anchor-offset`
  - `scroll-padding-top` and `scroll-margin-top` defaults
- Cross-browser scrollbar treatment (Firefox + WebKit)
- Forced-colors focus fallback and coarse-pointer scrollbar adjustment

## Common overrides

Use app CSS to override variables instead of editing package files:

```css
:root {
  --kb-anchor-offset: 72px;
  --kb-selection-background: var(--kb-primary);
  --kb-selection-foreground: var(--kb-primary-foreground);
}
```
