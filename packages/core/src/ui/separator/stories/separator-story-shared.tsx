import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "../separator";

export const baseMeta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">Billing summary</p>
        <p className="text-sm text-muted-foreground">
          24 active seats across 3 product teams
        </p>
      </div>
      <Separator {...args} />
      <div className="space-y-1">
        <p className="text-sm font-medium">Next invoice</p>
        <p className="text-sm text-muted-foreground">
          July 1, 2026 at 09:00 UTC
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-2">
      <span className="text-sm">Overview</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Deployments</span>
    </div>
  ),
};
