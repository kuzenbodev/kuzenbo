import type { Meta, StoryObj } from "@storybook/react";

import { QRCode } from "../qr-code";

export const baseMeta = {
  title: "Components/QRCode",
  component: QRCode,
  tags: ["autodocs"],
  argTypes: {
    data: { control: "text" },
  },
} satisfies Meta<typeof QRCode>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    data: "po=48213|region=emea|status=approved",
  },
  render: (args) => (
    <div className="grid gap-2">
      <div className="border-border bg-card size-36 rounded-md border p-2">
        <QRCode {...args} />
      </div>
      <div className="text-muted-foreground text-xs">
        Purchase order check-in
      </div>
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    data: "vendor=helix-industrial|batch=2026-q1|owner=finance-ops",
    robustness: "H",
  },
  render: (args) => (
    <div className="grid gap-2">
      <div className="border-border bg-card size-52 rounded-md border p-3">
        <QRCode {...args} />
      </div>
      <div className="text-muted-foreground text-xs">
        Large-format label output
      </div>
    </div>
  ),
};

export const LongPayload: Story = {
  args: {
    data: JSON.stringify({
      type: "shipment",
      id: "SHIP-88312",
      lane: "dal-sfo",
      checkpoint: "dock-6",
      owner: "operations-control",
      priority: "high",
      tags: ["cold-chain", "fragile", "insured"],
    }),
    robustness: "Q",
  },
  render: (args) => (
    <div className="grid gap-2">
      <div className="border-border bg-card size-40 rounded-md border p-2">
        <QRCode {...args} />
      </div>
      <div className="text-muted-foreground text-xs">
        Encoded shipment manifest payload
      </div>
    </div>
  ),
};
