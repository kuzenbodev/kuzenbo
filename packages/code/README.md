# @kuzenbo/code

Developer-experience primitives for code blocks, docs, and playground-style UI.

> 🧪 **Status: Preview (Not Published Yet)**

## ✨ What This Package Targets

`@kuzenbo/code` is built for code-heavy surfaces in documentation and product UIs.

- 🧱 Code display primitives (`CodeBlock`, `InlineCodeHighlight`, `CodeBlockToolbar`)
- 📦 Install UX (`PackageManagerTabs`, `InstallCommandSnippet`)
- 🪟 Visual shells (`CodeWindow`, `CodePreview`)
- 🧪 Review tools (`CodeDiffBlock`, `CodeLineHighlight`, `TerminalBlock`, `FileTree`)
- 🎛️ Playground system (`Playground.Root`, `Playground.Controls`, `Playground.PresetBar`, `Playground.Code`)
- 🌈 Shiki server utilities (`highlightCodeBlock`, `highlightInlineCode`, `highlightCodeToHtml`)

## 📦 Install (When Available)

```bash
bun add @kuzenbo/code @kuzenbo/core @kuzenbo/theme
```

```bash
npm install @kuzenbo/code @kuzenbo/core @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/code @kuzenbo/core @kuzenbo/theme
```

```bash
yarn add @kuzenbo/code @kuzenbo/core @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🧩 Dependency Governance

- 🛠️ `@uiw/react-codemirror` is intentionally retained for interactive editor surfaces used by `@kuzenbo/code`.
- 🧱 It is treated as an internal implementation dependency and is not re-exported as part of the public API contract.
- 🛡️ Retaining it avoids regressions in editor UX while the canonical `CodeBlock`/`Playground.*` surface remains stable.

## 🎨 Theme Pairing

`@kuzenbo/theme` is the runtime pair for `@kuzenbo/code`.

## ⚡ Quick Example

```tsx
import { CodeBlock, CodeBlockToolbar } from "@kuzenbo/code";
import { CopyButton } from "@kuzenbo/core";

const source = `export const ready = true;`;

export function CodeQuickExample() {
  return (
    <CodeBlock
      code={source}
      language="ts"
      toolbar={
        <CodeBlockToolbar
          language="ts"
          title="status.ts"
          end={<CopyButton size="xs" value={source} variant="ghost" />}
        />
      }
    />
  );
}
```

## 🧭 Playground Example

```tsx
"use client";

import { Playground, definePlaygroundControls } from "@kuzenbo/code";
import { Button } from "@kuzenbo/core";

const controls = definePlaygroundControls([
  {
    type: "string",
    prop: "children",
    label: "Label",
    initialValue: "Run",
    defaultValue: "Run",
  },
  {
    type: "select",
    prop: "variant",
    label: "Variant",
    initialValue: "default",
    defaultValue: "default",
    options: ["default", "secondary", "outline", "danger"],
  },
] as const);

export function PlaygroundQuickExample() {
  return (
    <Playground.Root
      controls={controls}
      preview={<Button />}
      template={`import { Button } from "@kuzenbo/core";

export function Demo() {
  return <Button{{props}}>{{children}}</Button>;
}`}
    />
  );
}
```

## 🔥 Canonical API Notes

This package exposes only the current canonical API surface:

- ✅ `CodeBlock`, `InstallCommandSnippet`, `CodePreview`, `Playground.*`
- ✅ Shiki utilities (`highlightCodeBlock`, `highlightInlineCode`, `highlightCodeToHtml`)

## 📚 Docs And Related Routes

- [Code Component](https://kuzenbo.com/docs/components/code)
- [Components Index](https://kuzenbo.com/docs/components)
- [Composition Patterns](https://kuzenbo.com/docs/patterns/composition)
