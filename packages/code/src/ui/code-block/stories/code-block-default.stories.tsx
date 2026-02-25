import type { Meta, StoryObj } from "@storybook/react";

import { CodeBlockToolbar } from "../../code-block-toolbar/code-block-toolbar";
import { CodeBlock } from "../code-block";

const INSTALL_COMMAND = "bun add @kuzenbo/code @kuzenbo/theme @kuzenbo/core";

const meta = {
  title: "Code/CodeBlock/Default",
  component: CodeBlock,
  tags: ["autodocs"],
  args: {
    language: "tsx",
    code: `import { CodePreview } from "@kuzenbo/code";

export const DocsExample = () => (
  <CodePreview
    title="Alert component"
    defaultMode="split"
    preview={<div>Preview content</div>}
    minimalCode={<code>{"<Alert />"}</code>}
    code={<code>{"<Alert tone="info" />"}</code>}
  />
);`,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InstallGuideCommand: Story = {
  args: {
    language: "bash",
    code: INSTALL_COMMAND,
    toolbar: (
      <CodeBlockToolbar
        copyValue={INSTALL_COMMAND}
        language="bash"
        title="Install required packages"
      />
    ),
  },
};

export const ApiRouteImplementation: Story = {
  args: {
    language: "ts",
    toolbar: (
      <CodeBlockToolbar
        copyValue={`export async function GET() {
  return Response.json({ status: "ok" });
}`}
        language="ts"
        title="apps/website/app/api/health/route.ts"
      />
    ),
    code: `export async function GET() {
  const response = await fetch("https://api.example.dev/status", {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return Response.json({ status: "degraded" }, { status: 503 });
  }

  return Response.json({ status: "ok" });
}`,
  },
};

export const HighlightedHtmlOutput: Story = {
  args: {
    language: "tsx",
    highlightedHtml: `<pre><code><span class="line">import { Button } from "@kuzenbo/core";</span>\n<span class="line highlighted">export const Demo = () =&gt; &lt;Button&gt;Ship&lt;/Button&gt;;</span></code></pre>`,
  },
};

export const LongConfigurationFile: Story = {
  args: {
    language: "json",
    code: `{
  "extends": "@kuzenbo/typescript/react-library",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "stories", "tests"],
  "exclude": ["dist", "node_modules"]
}`,
  },
};
