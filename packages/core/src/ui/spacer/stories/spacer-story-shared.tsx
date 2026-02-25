import type { Meta, StoryObj } from "@storybook/react";

import { Spacer } from "../spacer";

export const baseMeta = {
  title: "Components/Spacer",
  component: Spacer,
  tags: ["autodocs"],
} satisfies Meta<typeof Spacer>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-[420px] items-center rounded-md border border-border bg-card px-3 py-2 text-sm">
      <span>Procurement Alerts</span>
      <Spacer />
      <span className="text-muted-foreground">3 unresolved</span>
    </div>
  ),
};

export const InlineStack: Story = {
  render: () => (
    <div className="flex items-center rounded-md border border-border bg-card px-3 py-2 text-sm">
      <span>Requests</span>
      <Spacer size={20} />
      <span>Approvals</span>
      <Spacer size={20} />
      <span>Reconciliations</span>
    </div>
  ),
};

export const VerticalStack: Story = {
  render: () => (
    <div className="inline-flex flex-col rounded-md border border-border bg-card p-3 text-sm">
      <span>Finance review</span>
      <Spacer orientation="vertical" size={14} />
      <span>Legal review</span>
      <Spacer orientation="vertical" size={14} />
      <span>Release approval</span>
    </div>
  ),
};
