# @kuzenbo/core

Composable React UI primitives for production-grade interfaces.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/core` gives you token-aware primitives for forms, overlays, navigation, data display, and composition-heavy surfaces.

## 📦 Install

```bash
bun add @kuzenbo/core @kuzenbo/theme
```

```bash
npm install @kuzenbo/core @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/core @kuzenbo/theme
```

```bash
yarn add @kuzenbo/core @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@kuzenbo/theme`

## 🎨 Theme Pairing

`@kuzenbo/theme` is the required runtime pair for `@kuzenbo/core`.

## ⚡ Quick Example

```tsx
import "@kuzenbo/theme/prebuilt/kuzenbo.css";

import { Button, Card } from "@kuzenbo/core";
import { ThemeBootstrapScript, ThemeProvider } from "@kuzenbo/theme";

export function CoreQuickExample() {
  return (
    <>
      <ThemeBootstrapScript />
      <ThemeProvider>
        <Card className="max-w-sm p-4">
          <p className="text-sm text-muted-foreground">
            Core primitives are ready.
          </p>
          <Button className="mt-3">Create project</Button>
        </Card>
      </ThemeProvider>
    </>
  );
}
```

## 📋 CopyButton

Use `CopyButton` when users need command-style clipboard actions with status feedback (`idle`, `copying`, `copied`, `failed`) and an accessible live region.

```tsx
import { CopyButton } from "@kuzenbo/core";

export function InstallCommandCopy() {
  return (
    <CopyButton value="pnpm add @kuzenbo/core @kuzenbo/theme">
      Copy install command
    </CopyButton>
  );
}
```

## 🧱 Key Surface

- Forms and input controls (`Input`, `Select`, `Checkbox`, `RadioGroup`, `Textarea`, `NumberField`)
- Navigation and layout (`Container`, `Tabs`, `Breadcrumb`, `Sidebar`, `Menu`)
- Overlay and feedback (`Dialog`, `Drawer`, `Popover`, `Tooltip`, `Alert`, `Progress`)
- Data and composition (`Table`, `Card`, `Badge`, `Typography`, `Timeline`, `Toolbar`)
- Advanced interaction (`Autocomplete`, `Combobox`, `Command`, `Slider`, `RangeSlider`)

## 📚 Docs And Playgrounds

- [Installation](https://kuzenbo.com/docs/getting-started/installation)
- [Quickstart](https://kuzenbo.com/docs/getting-started/quickstart)
- [Components Index](https://kuzenbo.com/docs/components)
- [Button](https://kuzenbo.com/docs/components/button)
- [Composition Patterns](https://kuzenbo.com/docs/patterns/composition)

## 🧭 Compatibility And Status

`@kuzenbo/core` is public and actively documented. Keep `@kuzenbo/theme` installed in the same runtime.
