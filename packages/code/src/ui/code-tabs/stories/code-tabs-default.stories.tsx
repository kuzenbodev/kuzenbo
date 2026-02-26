import type { StoryObj } from "@storybook/react";

import { CodeBlock } from "../../code-block/code-block";
import { Default as DefaultStory, baseMeta } from "./code-tabs-story-shared";

const frameworkTabs = [
  {
    value: "react",
    label: "React",
    content: (
      <CodeBlock
        code={`import { createRoot } from "react-dom/client";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(<App />);`}
        language="tsx"
      />
    ),
  },
  {
    value: "next",
    label: "Next.js",
    content: (
      <CodeBlock
        code={`export default function Page() {
  return <main>Server-rendered docs page</main>;
}`}
        language="tsx"
      />
    ),
  },
  {
    value: "vite",
    label: "Vite",
    content: (
      <CodeBlock
        code={`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`}
        language="ts"
      />
    ),
  },
] as const;

const exportMatrixTabs = [
  {
    value: "exports",
    label: "exports",
    content: (
      <CodeBlock
        code={`{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  }
}`}
        language="json"
      />
    ),
  },
  {
    value: "types",
    label: "types",
    content: (
      <CodeBlock
        code={`export interface InstallCommandSnippetProps {
  packages: readonly string[];
  persistPreference?: boolean;
}`}
        language="ts"
      />
    ),
  },
  {
    value: "v1",
    label: "v1",
    disabled: true,
    content: (
      <CodeBlock
        code={`module.exports = require("./dist/index.cjs");`}
        language="js"
      />
    ),
  },
] as const;

export default {
  ...baseMeta,
  title: "Code/CodeTabs/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const FrameworkQuickstarts: Story = {
  args: {
    tabs: frameworkTabs,
    defaultValue: "next",
  },
};

export const PackageExportMatrix: Story = {
  args: {
    tabs: exportMatrixTabs,
    defaultValue: "exports",
  },
};

export const KeyboardNavigationNoLoop: Story = {
  args: {
    tabs: frameworkTabs,
    defaultValue: "react",
    loop: false,
  },
};
