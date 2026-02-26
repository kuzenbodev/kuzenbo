# @kuzenbo/ai

AI UI primitives, hooks, and prompt helpers for Kuzenbo apps.

> 🧪 **Status: Preview (Not Published Yet)**

## ✨ What This Package Targets

`@kuzenbo/ai` is aimed at lightweight assistant surfaces, session state helpers, and prompt utilities that integrate with your own model/provider stack.

## 📦 Install (When Available)

```bash
bun add @kuzenbo/ai @kuzenbo/core @kuzenbo/theme
```

```bash
npm install @kuzenbo/ai @kuzenbo/core @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/ai @kuzenbo/core @kuzenbo/theme
```

```bash
yarn add @kuzenbo/ai @kuzenbo/core @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Runtime Pairing

`@kuzenbo/ai` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
"use client";

import { AiWidget } from "@kuzenbo/ai/ui/ai-widget";
import { useAiSession } from "@kuzenbo/ai/hooks/use-ai-session";

export function AiQuickExample() {
  const session = useAiSession();

  return (
    <AiWidget title={session.active ? "Assistant (active)" : "Assistant"}>
      Messages in this session: {session.messages}
      <div className="mt-3 flex gap-2">
        <button onClick={session.start} type="button">
          Start message
        </button>
        <button onClick={session.reset} type="button">
          Reset
        </button>
      </div>
    </AiWidget>
  );
}
```

## 🧱 Expected Surface

- Components: `AiWidget`
- Hooks: `useAiSession`
- Utilities: `buildAiPrompt`

## 📚 Docs And Related Routes

- [AI Widget](https://kuzenbo.com/docs/components/ai-widget)
- [useAiSession](https://kuzenbo.com/docs/hooks/use-ai-session)
- [AI Prompting Foundation](https://kuzenbo.com/docs/foundations/ai-prompting)

## 🛟 Safe Adoption Guidance

Until publish, treat this package as preview-only.
For production apps today, use `@kuzenbo/core` + `@kuzenbo/hooks` and keep AI transport/state in app-level modules.
