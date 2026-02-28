import type { Meta, StoryObj } from "@storybook/react";

import { CodeTabs } from "../code-tabs";

export const baseMeta = {
  args: {
    tabs: [
      {
        content: <code>npm install @kuzenbo/code @kuzenbo/theme</code>,
        label: "npm",
        value: "npm",
      },
      {
        content: <code>pnpm add @kuzenbo/code @kuzenbo/theme</code>,
        label: "pnpm",
        value: "pnpm",
      },
      {
        content: <code>yarn add @kuzenbo/code @kuzenbo/theme</code>,
        label: "yarn",
        value: "yarn",
      },
      {
        content: <code>bun add @kuzenbo/code @kuzenbo/theme</code>,
        label: "bun",
        value: "bun",
      },
    ],
  },
  component: CodeTabs,
  tags: ["autodocs"],
  title: "Code/CodeTabs",
} satisfies Meta<typeof CodeTabs>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
