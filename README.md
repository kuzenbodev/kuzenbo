# Kuzenbo

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](./LICENSE)
[![CI](https://github.com/kuzenbodev/kuzenbo/actions/workflows/ci.yml/badge.svg)](https://github.com/kuzenbodev/kuzenbo/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/badge/docs-kuzenbo.com-16a34a)](https://kuzenbo.com/docs)
[![Bun](https://img.shields.io/badge/bun-1.3.9-f9f1e1)](https://bun.sh)
[![Monorepo](https://img.shields.io/badge/monorepo-Turborepo-ef4444)](https://turbo.build)

Kuzenbo is an open source React UI suite with composable primitives, token-first theming, and focused packages for charts, notifications, dates, data tables, code surfaces, and AI UI workflows.

## 🚀 Why Kuzenbo

- 🧱 Composable primitives with predictable styling contracts.
- 🎨 Semantic theme tokens that stay consistent across light and dark mode.
- 📦 Focused packages so you install only what your product needs.
- 🧪 Docs-first adoption with practical examples and component-level guidance.
- ⚡ Fast onboarding path from install to production-ready UI.

## ⚡ Start In 60 Seconds

Install the core runtime pair first:

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

Hooks-only setup:

```bash
bun add @kuzenbo/hooks
```

For UI packages, pair them with `@kuzenbo/theme` in the same app runtime.

## 🧩 Choose Your Package

| Package                  | Purpose                                            | Status                      | Theme Pairing                                 |
| ------------------------ | -------------------------------------------------- | --------------------------- | --------------------------------------------- |
| `@kuzenbo/core`          | Main UI primitives and composition building blocks | Public                      | Required                                      |
| `@kuzenbo/hooks`         | Standalone React hooks                             | Public                      | Optional                                      |
| `@kuzenbo/charts`        | Chart primitives and prebuilt chart components     | Public                      | Required                                      |
| `@kuzenbo/notifications` | Toast and notification primitives                  | Public                      | Required                                      |
| `@kuzenbo/styles`        | Optional baseline global CSS                       | Public                      | Optional                                      |
| `@kuzenbo/theme`         | Theme runtime, bootstrap script, semantic tokens   | Public                      | N/A                                           |
| `@kuzenbo/ai`            | AI UI primitives, hooks, prompt helpers            | Preview (Not Published Yet) | Required                                      |
| `@kuzenbo/code`          | Code snippet components, hooks, mock helpers       | Preview (Not Published Yet) | Required                                      |
| `@kuzenbo/datatable`     | Table UI scaffolding and state helpers             | Preview (Not Published Yet) | Required                                      |
| `@kuzenbo/date`          | Calendar and date primitives                       | Preview (Not Published Yet) | Required                                      |
| `@kuzenbo/tiptap`        | Rich text editor primitives for Tiptap             | Preview (Not Published Yet) | Required (`@kuzenbo/core` + `@kuzenbo/theme`) |
| `@kuzenbo/cli`           | CLI tooling surface                                | Preview (Not Published Yet) | No                                            |
| `@kuzenbo/mcp`           | MCP integration surface                            | Preview (Not Published Yet) | No                                            |
| `@kuzenbo/storybook`     | Shared Storybook configuration package             | Internal Only               | No                                            |

## 🛠️ Quickstart Example

```tsx
import "@kuzenbo/theme/prebuilt/kuzenbo.css";
import "@kuzenbo/styles/recommended.css";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
  Button,
  Card,
} from "@kuzenbo/core";
import { ThemeBootstrapScript, ThemeProvider } from "@kuzenbo/theme";

export default function App() {
  return (
    <>
      <ThemeBootstrapScript />
      <ThemeProvider>
        <main className="bg-background text-foreground min-h-screen p-6">
          <div className="mx-auto grid max-w-3xl gap-4">
            <Announcement themed>
              <AnnouncementTag>Release</AnnouncementTag>
              <AnnouncementTitle>Kuzenbo is ready to ship.</AnnouncementTitle>
            </Announcement>

            <Card className="p-6">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Build with semantic tokens and composable primitives.
              </p>
              <div className="mt-4 flex gap-2">
                <Button>Create Report</Button>
                <Button variant="outline">View Logs</Button>
              </div>
            </Card>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}
```

## 🗺️ Docs Map

- 🚦 Getting Started:
  - [Introduction](https://kuzenbo.com/docs/getting-started/introduction)
  - [Installation](https://kuzenbo.com/docs/getting-started/installation)
  - [Quickstart](https://kuzenbo.com/docs/getting-started/quickstart)
  - [Theming](https://kuzenbo.com/docs/getting-started/theming)
  - [Styling](https://kuzenbo.com/docs/getting-started/styling)
- 🧱 Foundations:
  - [Theme Runtime](https://kuzenbo.com/docs/foundations/theme-runtime)
  - [Styles Baseline](https://kuzenbo.com/docs/foundations/styles-baseline)
  - [Charts Foundation](https://kuzenbo.com/docs/foundations/charts)
- 🧩 Components: [Components Index](https://kuzenbo.com/docs/components)
- 🪝 Hooks: [Hooks Index](https://kuzenbo.com/docs/hooks)
- 📚 Reference: [Reference Index](https://kuzenbo.com/docs/reference)

## 🎛️ Live Playgrounds

Kuzenbo component docs are designed for practical exploration, including interactive examples and playground-oriented pages.

- Start with [Button](https://kuzenbo.com/docs/components/button)
- Explore [Chart](https://kuzenbo.com/docs/components/chart)
- Try [Calendar](https://kuzenbo.com/docs/components/calendar)
- Build with [Toast](https://kuzenbo.com/docs/components/toast)

## 🔎 Package Status Notes

- ✅ **Public**: installable and documented for production use.
- 🧪 **Preview (Not Published Yet)**: documented surface is evolving and can change before stable publish.
- 🔒 **Internal Only**: used inside the Kuzenbo monorepo and not intended for external consumption.

## 🤝 Contributing

For contribution guidelines, use [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)
