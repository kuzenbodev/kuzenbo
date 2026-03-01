# @kuzenbo/theme

Theme runtime, semantic tokens, and prebuilt themes for Kuzenbo.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/theme` handles light/dark mode resolution, pre-hydration theme bootstrap, tokenized CSS variables, and provider-level runtime wiring.

## 📦 Install

```bash
bun add @kuzenbo/theme
```

```bash
npm install @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/theme
```

```bash
yarn add @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `next-themes`

## 🎨 Runtime Pairing

`@kuzenbo/theme` is the essential runtime package for Kuzenbo UI.
Install it with `@kuzenbo/core`, `@kuzenbo/ai`, `@kuzenbo/charts`, `@kuzenbo/date`, `@kuzenbo/notifications`, `@kuzenbo/datatable`, `@kuzenbo/code`, or `@kuzenbo/tiptap`.

## ⚡ Quick Example

```tsx
import type { ReactNode } from "react";

import "@kuzenbo/theme/prebuilt/kuzenbo.css";
import { ThemeBootstrapScript } from "@kuzenbo/theme";
import { ThemeProvider } from "@kuzenbo/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeBootstrapScript />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## 🧱 Key Surface

- Runtime APIs: `ThemeBootstrapScript` (root) and `ThemeProvider` (`@kuzenbo/theme`)
- Bootstrap utilities: `resolveThemeBootstrapPlan`, `getThemeBootstrapScript`, `applyThemeToRootElement`
- CSS assets: `@kuzenbo/theme/prebuilt/*.css`

## 🪜 Z-Index Layer Tokens

`@kuzenbo/theme` also provides semantic z-index layer tokens so components can share consistent stacking and apps can override globally with CSS variables.

- 🧱 Base layers: `z-underlay`, `z-behind`, `z-base`, `z-inline`
- 🪄 Raised layers: `z-raised`, `z-elevated`, `z-floating`, `z-sticky`
- 🧩 Overlay layers: `z-overlay`, `z-toast-viewport`, `z-affix`, `z-toast-stack`, `z-immersive`

```css
:root {
  --kb-z-sticky: 60;
  --kb-z-overlay: 80;
  --kb-z-toast-viewport: 120;
}
```

## 🖱️ Cursor Token Utility

`@kuzenbo/theme` provides a semantic cursor token and utility for interactive surfaces:

- Token: `--kb-cursor` (default: `pointer`)
- Utility: `cursor-clickable` (`cursor: var(--kb-cursor)`)

```css
:root {
  --kb-cursor: pointer;
}

.read-only-surface {
  --kb-cursor: default;
}
```

```tsx
<button className="cursor-clickable">Open</button>
```

Use scoped overrides when a section should intentionally keep the default cursor while still consuming shared component utilities.

## 📐 Container Width Token

`@kuzenbo/theme` also exposes a layout token used by `@kuzenbo/core` `Container`:

- Token: `--kb-container-max-width` (default: `86rem`)
- Usage: `Container` resolves `max-width` via `var(--kb-container-max-width, 86rem)`

```css
:root {
  --kb-container-max-width: 92rem;
}

.reading-surface {
  --kb-container-max-width: 72rem;
}
```

## 🌫️ Overlay Scrim Tokens

Use shared scrim tokens to tune backdrop strength consistently across dialog-like overlays:

- `--kb-overlay-scrim-opacity` (default: `0.1`)
- `--kb-overlay-scrim-blur` (default: `4px`)

These tokens are consumed by `Dialog`, `Sheet`, `Popover`, `AlertDialog`, and `PreviewCard` backdrops.

## 🧱 Surface Layout Tokens

Tune modal/surface geometry globally without per-instance class overrides:

- Dialog: `--kb-dialog-max-width`, `--kb-dialog-edge-gutter`
- Sheet (left/right): `--kb-sheet-side-width`, `--kb-sheet-side-max-width`
- Drawer: `--kb-drawer-bleed`, `--kb-drawer-peek`, `--kb-drawer-stack-step`, `--kb-drawer-max-height`, `--kb-drawer-content-max-width-{xs|sm|md|lg|xl}`, `--kb-drawer-side-width-{xs|sm|md|lg|xl}`, `--kb-drawer-action-sheet-max-width`, `--kb-drawer-backdrop-opacity`, `--kb-drawer-backdrop-opacity-dark`

## 🔔 Toast Layout Tokens

Control notification density and readable width at system level:

- Viewport widths: `--kb-toast-viewport-width-{xs|sm|md|lg|xl}` and `--kb-toast-viewport-width-{xs|sm|md|lg|xl}-sm`
- Toast card caps: `--kb-toast-max-width-{xs|sm|md|lg|xl}`

## 📊 Utility Layout Tokens

Additional cross-package layout tokens:

- Overlay list cap (`Select`, `Autocomplete`, `Combobox`): `--kb-overlay-list-max-height`
- Charts frame minimum height: `--kb-chart-min-height`
- Sidebar defaults: `--kb-sidebar-width`, `--kb-sidebar-width-mobile`, `--kb-sidebar-width-icon`

## ✍️ Typography Tokens

Global typography primitives can now be tuned with `--kb-typography-*` variables:

- Headings (`Typography.Heading`, `H1..H6`, `Display`, `Subheading`):
  `--kb-typography-heading-*-size`, `--kb-typography-heading-*-line-height`
- Text variants (`Typography.Text`, `Body`, `Lead`, `Muted`, `Small`, `Caption`, `Overline`, `Eyebrow`):
  `--kb-typography-text-*-size`, `--kb-typography-text-*-line-height`
- Prose wrapper (`Typography.Prose`):
  `--kb-typography-prose-max-width`, `--kb-typography-prose-paragraph-margin-bottom`,
  `--kb-typography-prose-blockquote-size`, `--kb-typography-prose-blockquote-line-height`,
  `--kb-typography-prose-inline-code-size`, `--kb-typography-prose-code-size`, `--kb-typography-prose-code-line-height`
- Block/list primitives:
  `--kb-typography-blockquote-border-width`, `--kb-typography-blockquote-padding-inline-start`,
  `--kb-typography-list-indent`, `--kb-typography-list-item-spacing`, `--kb-typography-list-item-line-height`

```css
:root {
  --kb-overlay-scrim-opacity: 0.14;
  --kb-overlay-scrim-blur: 6px;

  --kb-dialog-max-width: 34rem;
  --kb-sheet-side-max-width: 28rem;
  --kb-drawer-side-width-md: 22rem;

  --kb-toast-viewport-width-md: 280px;
  --kb-toast-viewport-width-md-sm: 340px;
  --kb-toast-max-width-md: 20rem;

  --kb-overlay-list-max-height: 24rem;
  --kb-chart-min-height: 280px;
  --kb-sidebar-width: 18rem;

  --kb-typography-heading-h1-size: 2.5rem;
  --kb-typography-heading-h1-line-height: 3rem;
  --kb-typography-text-body-size: 1.0625rem;
  --kb-typography-text-body-line-height: 1.875rem;
  --kb-typography-prose-max-width: 72ch;
  --kb-typography-list-indent: 1.5rem;
}
```

## 📚 Docs And Playgrounds

- [Theming Guide](https://kuzenbo.com/docs/getting-started/theming)
- [Theme Runtime](https://kuzenbo.com/docs/foundations/theme-runtime)
- [Dark Mode Foundation](https://kuzenbo.com/docs/foundations/dark-mode)

## 🧭 Compatibility And Status

`@kuzenbo/theme` is public and required for Kuzenbo UI package runtimes.
