---
name: kuzenbo-notifications-usage
description: Implement non-blocking toast notifications with @kuzenbo/notifications in React apps using @kuzenbo/core and @kuzenbo/theme. Use when tasks mention toast UX, success/error feedback, promise-based async toasts, notification provider setup, or toast customization.
---

# Kuzenbo Notifications Usage

Use this skill for external app code that consumes the stable public package `@kuzenbo/notifications@0.0.6`.

## Runtime Setup

1. Install runtime dependencies:

```bash
npm install @kuzenbo/notifications @kuzenbo/core @kuzenbo/theme
```

2. Load theme CSS once:

```ts
import "@kuzenbo/theme/prebuilt/kuzenbo.css";
```

3. Add `ToastProvider` near app root before using notification hooks.

## Toast Workflow

1. Import from `@kuzenbo/notifications/ui/toast`.
2. Use `useToast()` for most flows (`success`, `error`, `info`, `warning`, `loading`, `promise`).
3. Use namespace primitives (`Toast.Root`, `Toast.Content`, etc.) only when custom composition is needed.
4. Keep toast copy short, action-oriented, and non-blocking.

## Guardrails

- `ToastProvider` must exist in tree before calling `useToast`.
- Use public `@kuzenbo/notifications/ui/toast` surface only.
- Prefer `toast.promise(...)` for async lifecycle feedback.
- If a requested capability is missing, fall back to exported primitives in `references/toast-api.md`.

## References

- `references/toast-api.md`
