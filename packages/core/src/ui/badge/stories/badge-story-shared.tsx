import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";

const variantOptions = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "success",
  "warning",
  "info",
  "danger",
] as const;

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { children: "Active contract" },
};

export const Secondary: Story = {
  args: { children: "Growth plan", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "Requires review", variant: "outline" },
};

export const Success: Story = {
  args: { children: "SLA healthy", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Renewal in 14 days", variant: "warning" },
};

export const Info: Story = {
  args: { children: "Sync in progress", variant: "info" },
};

export const Danger: Story = {
  args: { children: "Payment failed", variant: "danger" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Enterprise account</Badge>
      <Badge variant="secondary">Pilot workspace</Badge>
      <Badge variant="outline">Contract pending</Badge>
      <Badge variant="success">Invoice paid</Badge>
      <Badge variant="warning">Usage at 90%</Badge>
      <Badge variant="info">Data sync queued</Badge>
      <Badge variant="danger">Action required</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {sizeOptions.map((size) => (
        <Badge key={size} size={size}>
          {size.toUpperCase()} tier
        </Badge>
      ))}
    </div>
  ),
};
