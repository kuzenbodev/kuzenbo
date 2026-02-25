import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "../progress";

export const baseMeta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <Progress {...args}>
      <Progress.Label>Progress</Progress.Label>
      <Progress.Value />
    </Progress>
  ),
};
