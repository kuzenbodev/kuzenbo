import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../input/input";
import { Label } from "../label";

export const baseMeta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="workspace-name">Workspace name</Label>
      <Input id="workspace-name" placeholder="Acme Security Platform" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="billing-owner-email">
        Billing owner email
        <span aria-hidden="true" className="text-danger-foreground">
          *
        </span>
      </Label>
      <Input
        id="billing-owner-email"
        placeholder="owner@acme.io"
        required
        type="email"
      />
    </div>
  ),
};

export const Optional: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="purchase-order-code">
        Purchase order code
        <span className="text-muted-foreground">(optional)</span>
      </Label>
      <Input id="purchase-order-code" placeholder="PO-2026-0421" />
    </div>
  ),
};
