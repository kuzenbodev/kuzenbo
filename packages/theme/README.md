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

## 📚 Docs And Playgrounds

- [Theming Guide](https://kuzenbo.com/docs/getting-started/theming)
- [Theme Runtime](https://kuzenbo.com/docs/foundations/theme-runtime)
- [Dark Mode Foundation](https://kuzenbo.com/docs/foundations/dark-mode)

## 🧭 Compatibility And Status

`@kuzenbo/theme` is public and required for Kuzenbo UI package runtimes.
