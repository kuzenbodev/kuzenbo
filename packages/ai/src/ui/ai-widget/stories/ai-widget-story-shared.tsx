import type { Meta, StoryObj } from "@storybook/react";

import { AiWidget } from "../ai-widget";

export const baseMeta = {
  title: "AI/AiWidget",
  component: AiWidget,
  tags: ["autodocs"],
} satisfies Meta<typeof AiWidget>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    title: "Assistant",
    children: "Mock widget content for initial package setup.",
  },
};
