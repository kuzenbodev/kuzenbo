import type { Meta, StoryObj } from "@storybook/react";

import { AiWidget } from "../ai-widget";

export const baseMeta = {
  component: AiWidget,
  tags: ["autodocs"],
  title: "AI/AiWidget",
} satisfies Meta<typeof AiWidget>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    children: "Mock widget content for initial package setup.",
    title: "Assistant",
  },
};
