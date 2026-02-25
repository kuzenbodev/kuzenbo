# @kuzenbo/styles

Optional baseline global CSS for Kuzenbo-powered apps.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/styles` provides optional baseline global styles (focus rings, scrollbars, text wrapping, selection, motion-safe behavior) while keeping semantic theme token compatibility.

## 📦 Install

```bash
bun add @kuzenbo/styles
```

```bash
npm install @kuzenbo/styles
```

```bash
pnpm add @kuzenbo/styles
```

```bash
yarn add @kuzenbo/styles
```

## ✅ Requirements

- No React runtime dependency
- Optional companion package: `@kuzenbo/theme`

## 🎨 Theme Pairing

`@kuzenbo/styles` is optional baseline CSS.
For Kuzenbo UI packages (`core`, `ai`, `charts`, `date`, `notifications`, `datatable`, `code`, `tiptap`), install `@kuzenbo/theme` as the runtime theme layer.

## ⚡ Quick Example

```tsx
import "@kuzenbo/theme/prebuilt/kuzenbo.css";
import "@kuzenbo/styles/recommended.css";
```

## 🧱 Key Surface

- CSS entrypoint: `@kuzenbo/styles/recommended.css`
- Baseline behavior: focus-visible rings, scrollbar polish, semantic selection colors, motion-aware smooth scrolling
- Optional sticky-header offset variable: `--kb-anchor-offset`

## 📚 Docs And Playgrounds

- [Styling Guide](https://kuzenbo.com/docs/getting-started/styling)
- [Styles Baseline](https://kuzenbo.com/docs/foundations/styles-baseline)
- [Color Primitives](https://kuzenbo.com/docs/foundations/color-primitives)

## 🧭 Compatibility And Status

`@kuzenbo/styles` is public and safe to adopt incrementally.
