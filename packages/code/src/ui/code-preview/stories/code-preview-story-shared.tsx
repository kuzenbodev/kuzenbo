import type { Meta, StoryObj } from "@storybook/react";

import { CodeBlock } from "../../code-block/code-block";
import { CodePreview } from "../code-preview";

export const baseMeta = {
  title: "Code/CodePreview",
  component: CodePreview,
  tags: ["autodocs"],
  args: {
    title: "Button example",
    preview: (
      <div className="rounded-md border border-border bg-card p-4">
        <button
          className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-primary px-3 text-sm font-medium text-primary-foreground"
          type="button"
        >
          Click me
        </button>
      </div>
    ),
    minimalCode: <CodeBlock code="<Button>Click me</Button>" language="tsx" />,
    code: (
      <CodeBlock
        code={`import { Button } from "@kuzenbo/core";

export const Demo = () => <Button>Click me</Button>;`}
        language="tsx"
      />
    ),
    defaultMode: "split",
  },
} satisfies Meta<typeof CodePreview>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
