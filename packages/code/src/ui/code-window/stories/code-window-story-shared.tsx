import type { Meta, StoryObj } from "@storybook/react";

import { CodeWindow } from "../code-window";

export const baseMeta = {
  args: {
    children: <code>npm install @kuzenbo/code @kuzenbo/theme</code>,
    title: "Install command",
  },
  component: CodeWindow,
  tags: ["autodocs"],
  title: "Code/CodeWindow",
} satisfies Meta<typeof CodeWindow>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
