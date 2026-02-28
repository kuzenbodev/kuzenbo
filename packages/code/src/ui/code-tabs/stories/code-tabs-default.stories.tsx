import type { StoryObj } from "@storybook/react";

import { CodeBlock } from "../../code-block/code-block";
import { Default as DefaultStory, baseMeta } from "./code-tabs-story-shared";

const frameworkTabs = [
  {
    content: (
      <CodeBlock
        code={`import { createRoot } from "react-dom/client";
import { App } from "./app";

createRoot(document.getElementById("root")!).render(<App />);`}
        language="tsx"
      />
    ),
    label: "React",
    value: "react",
  },
  {
    content: (
      <CodeBlock
        code={`export default function Page() {
  return <main>Server-rendered docs page</main>;
}`}
        language="tsx"
      />
    ),
    label: "Next.js",
    value: "next",
  },
  {
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
    label: "Vite",
    value: "vite",
  },
] as const;

const exportMatrixTabs = [
  {
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
    label: "exports",
    value: "exports",
  },
  {
    content: (
      <CodeBlock
        code={`export interface InstallCommandSnippetProps {
  packages: readonly string[];
  persistPreference?: boolean;
}`}
        language="ts"
      />
    ),
    label: "types",
    value: "types",
  },
  {
    content: (
      <CodeBlock
        code={`module.exports = require("./dist/index.cjs");`}
        language="js"
      />
    ),
    disabled: true,
    label: "v1",
    value: "v1",
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
    defaultValue: "next",
    tabs: frameworkTabs,
  },
};

export const PackageExportMatrix: Story = {
  args: {
    defaultValue: "exports",
    tabs: exportMatrixTabs,
  },
};

export const KeyboardNavigationNoLoop: Story = {
  args: {
    defaultValue: "react",
    loop: false,
    tabs: frameworkTabs,
  },
};
