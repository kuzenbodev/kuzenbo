# @kuzenbo/notifications

Toast and notification primitives for non-blocking product feedback.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/notifications` provides composable toast primitives and ergonomic helper APIs for success, warning, error, loading, and async promise flows.

## 📦 Install

```bash
bun add @kuzenbo/notifications @kuzenbo/core @kuzenbo/theme
```

```bash
npm install @kuzenbo/notifications @kuzenbo/core @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/notifications @kuzenbo/core @kuzenbo/theme
```

```bash
yarn add @kuzenbo/notifications @kuzenbo/core @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Runtime Pairing

`@kuzenbo/notifications` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
"use client";

import { ToastProvider, useToast } from "@kuzenbo/notifications";

function SaveButton() {
  const toast = useToast();

  return (
    <button
      className="rounded-md border border-border px-3 py-2 text-sm"
      onClick={() => toast.success({ description: "Changes saved." })}
      type="button"
    >
      Save
    </button>
  );
}

export function NotificationsQuickExample() {
  return (
    <ToastProvider>
      <SaveButton />
    </ToastProvider>
  );
}
```

## 🧱 Key Surface

- Namespace primitives: `Toast.Root`, `Toast.Content`, `Toast.Title`, `Toast.Description`, `Toast.Action`, `Toast.Close`, `Toast.Viewport`
- Provider utilities: `ToastProvider`, `createToastManager`, `useToast`, `useToastManager`
- Async flows: `toast.promise(...)` for loading/success/error state transitions

## 📚 Docs And Playgrounds

- [Toast](https://kuzenbo.com/docs/components/toast)
- [Alert](https://kuzenbo.com/docs/components/alert)
- [Accessibility Foundation](https://kuzenbo.com/docs/foundations/accessibility)

## 🧭 Compatibility And Status

`@kuzenbo/notifications` is public and production-ready.
