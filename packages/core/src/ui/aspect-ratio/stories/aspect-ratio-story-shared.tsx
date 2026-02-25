import type { Meta, StoryObj } from "@storybook/react";

import { AspectRatio } from "../aspect-ratio";

export const baseMeta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio
      {...args}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="flex size-full flex-col justify-between p-4">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase">
            Q3 Spend Snapshot
          </div>
          <div className="mt-1 text-lg font-semibold">Procurement Overview</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-md bg-muted p-2">
            <div className="text-muted-foreground">Approved</div>
            <div className="mt-1 font-medium">$1.8M</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-muted-foreground">Pending</div>
            <div className="mt-1 font-medium">$420K</div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <div className="text-muted-foreground">Blocked</div>
            <div className="mt-1 font-medium">$86K</div>
          </div>
        </div>
      </div>
    </AspectRatio>
  ),
};

export const Ratio16x9: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio
      {...args}
      className="overflow-hidden rounded-lg border border-border bg-background"
    >
      <div className="grid size-full grid-cols-5 gap-0">
        <div className="col-span-3 border-r border-border bg-card p-4">
          <div className="text-sm font-medium">Release Readiness Dashboard</div>
          <div className="mt-2 text-sm text-muted-foreground">
            SLA compliance remains above target for all customer-facing systems.
          </div>
        </div>
        <div className="col-span-2 grid grid-rows-2">
          <div className="border-b border-border bg-muted p-3 text-xs">
            Support backlog: 14 tickets
          </div>
          <div className="bg-muted p-3 text-xs">
            Deployment window: 22:00 UTC
          </div>
        </div>
      </div>
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <AspectRatio
      {...args}
      className="overflow-hidden rounded-lg border border-border bg-card"
    >
      <div className="grid size-full grid-rows-[auto_1fr_auto] gap-3 p-4">
        <div className="text-sm font-medium">Warehouse Occupancy</div>
        <div className="grid content-center justify-items-center rounded-md bg-muted text-center">
          <div className="text-3xl font-semibold">82%</div>
          <div className="text-xs text-muted-foreground">Capacity used</div>
        </div>
        <div className="text-xs text-muted-foreground">
          6 of 11 docks are currently active.
        </div>
      </div>
    </AspectRatio>
  ),
};
