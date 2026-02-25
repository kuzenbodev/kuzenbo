import type { Meta, StoryObj } from "@storybook/react";

import { CodeTabs } from "../code-tabs";

export const baseMeta = {
  title: "Code/CodeTabs",
  component: CodeTabs,
  tags: ["autodocs"],
  args: {
    tabs: [
      {
        value: "npm",
        label: "npm",
        content: <code>npm install @kuzenbo/code @kuzenbo/theme</code>,
      },
      {
        value: "pnpm",
        label: "pnpm",
        content: <code>pnpm add @kuzenbo/code @kuzenbo/theme</code>,
      },
      {
        value: "yarn",
        label: "yarn",
        content: <code>yarn add @kuzenbo/code @kuzenbo/theme</code>,
      },
      {
        value: "bun",
        label: "bun",
        content: <code>bun add @kuzenbo/code @kuzenbo/theme</code>,
      },
    ],
  },
} satisfies Meta<typeof CodeTabs>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
