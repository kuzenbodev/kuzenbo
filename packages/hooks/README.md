# @kuzenbo/hooks

Standalone React hooks for Kuzenbo and custom applications.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/hooks` provides focused React hooks that work independently of UI components and can be adopted in any React app.

## 📦 Install

```bash
bun add @kuzenbo/hooks
```

```bash
npm install @kuzenbo/hooks
```

```bash
pnpm add @kuzenbo/hooks
```

```bash
yarn add @kuzenbo/hooks
```

## ✅ Requirements

- React 19+

## 🎨 Theme Pairing

`@kuzenbo/hooks` can be used standalone.
When combined with Kuzenbo UI packages (`core`, `ai`, `charts`, `date`, `notifications`, `datatable`, `code`, `tiptap`), install `@kuzenbo/theme` as well.

## ⚡ Quick Example

```tsx
"use client";

import { useIsMobile } from "@kuzenbo/hooks/use-mobile";

export function HookQuickExample() {
  const isMobile = useIsMobile();

  return isMobile ? (
    <div data-layout="mobile">Mobile layout</div>
  ) : (
    <div data-layout="desktop">Desktop layout</div>
  );
}
```

## 🧱 Key Surface

- `useClipboard`
- `useFullscreen`
- `useIsMobile`
- `useIsomorphicEffect`

## 📚 Docs And Playgrounds

- [Hooks Index](https://kuzenbo.com/docs/hooks)
- [useClipboard](https://kuzenbo.com/docs/hooks/use-clipboard)
- [useFullscreen](https://kuzenbo.com/docs/hooks/use-fullscreen)
- [useMobile](https://kuzenbo.com/docs/hooks/use-mobile)
- [useIsomorphicEffect](https://kuzenbo.com/docs/hooks/use-isomorphic-effect)

## 🧭 Compatibility And Status

`@kuzenbo/hooks` is public and stable for standalone usage.
