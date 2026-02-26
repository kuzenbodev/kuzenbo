# @kuzenbo/tiptap

Rich text editor primitives for Tiptap-based product editing workflows.

> 🧪 **Status: Preview (Not Published Yet)**

## ✨ What This Package Targets

`@kuzenbo/tiptap` targets editor composition for writing, commenting, and knowledge workflows with shared toolbar/content primitives.

## 📦 Install (When Available)

```bash
bun add @kuzenbo/tiptap @kuzenbo/core @kuzenbo/theme @tiptap/react
```

```bash
npm install @kuzenbo/tiptap @kuzenbo/core @kuzenbo/theme @tiptap/react
```

```bash
pnpm add @kuzenbo/tiptap @kuzenbo/core @kuzenbo/theme @tiptap/react
```

```bash
yarn add @kuzenbo/tiptap @kuzenbo/core @kuzenbo/theme @tiptap/react
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@tiptap/react` and compatible Tiptap extensions
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Theme Pairing

`@kuzenbo/tiptap` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
import { createTiptapExtensionsPreset } from "@kuzenbo/tiptap/editor/create-tiptap-extensions-preset";

const extensions = createTiptapExtensionsPreset("document", {
  placeholder: "Write your release notes...",
});
```

## 🧱 Expected Surface

- Editor setup: `useKuzenboEditor`, `createTiptapExtensionsPreset`, `createMarkdownAdapter`
- Editor UI: `TiptapEditor`, `TiptapEditorToolbar`, `TiptapEditorContent`, `TiptapEditorControlsGroup`
- Extension builders: `createLinkExtension`, `createMentionExtension`, `createSlashExtension`, `createTaskListExtension`

## 📚 Docs And Related Routes

- [Components Index](https://kuzenbo.com/docs/components)
- [Composition Patterns](https://kuzenbo.com/docs/patterns/composition)
- [Migration Patterns](https://kuzenbo.com/docs/patterns/migration)

## 🛟 Safe Adoption Guidance

This package is preview-only and can change before publish.
For production today, keep editor integrations behind app-level wrappers and version pins.
