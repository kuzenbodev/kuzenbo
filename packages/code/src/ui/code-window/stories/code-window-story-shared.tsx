import type { Meta, StoryObj } from "@storybook/react";

import { CodeWindow } from "../code-window";

export const baseMeta = {
  title: "Code/CodeWindow",
  component: CodeWindow,
  tags: ["autodocs"],
  args: {
    title: "Install command",
    children: <code>npm install @kuzenbo/code @kuzenbo/theme</code>,
  },
} satisfies Meta<typeof CodeWindow>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
