import type { Meta, StoryObj } from "@storybook/react";

import { Cancel01Icon, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Pill } from "../pill";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "link",
        "success",
        "warning",
        "info",
        "danger",
      ],
    },
  },
} satisfies Meta<typeof Pill>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { children: "Finance Ops", size: "md", variant: "secondary" },
};

export const Removable: Story = {
  render: (args) => (
    <Pill {...args}>
      <Pill.Icon icon={SearchIcon} />
      Escalation alerts
      <Pill.Button aria-label="Remove escalation alerts">
        <HugeiconsIcon icon={Cancel01Icon} />
      </Pill.Button>
    </Pill>
  ),
  args: {
    size: "md",
    variant: "secondary",
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Pill variant="success">
        <Pill.Status>
          <Pill.Indicator pulse variant="success" />
          Stable
        </Pill.Status>
        Invoicing API
      </Pill>
      <Pill variant="warning">
        <Pill.Status>
          <Pill.Indicator variant="warning" />
          Delayed
        </Pill.Status>
        Settlement Queue
      </Pill>
      <Pill variant="danger">
        <Pill.Status>
          <Pill.Indicator variant="error" />
          Degraded
        </Pill.Status>
        Vendor Sync
      </Pill>
      <Pill variant="info">
        <Pill.Status>
          <Pill.Indicator variant="info" />
          Updating
        </Pill.Status>
        Reporting Job
      </Pill>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {sizeOptions.map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <span className="w-8 text-xs font-medium text-muted-foreground uppercase">
            {size}
          </span>
          <Pill size={size} variant="secondary">
            <Pill.Status>
              <Pill.Indicator variant="info" />
              Active
            </Pill.Status>
            Procurement seats
            <Pill.Delta delta={12} />
            <Pill.AvatarGroup>
              <Pill.Avatar fallback="DR" />
              <Pill.Avatar fallback="KS" />
            </Pill.AvatarGroup>
            <Pill.Button aria-label={`Dismiss ${size} pill`}>
              <HugeiconsIcon icon={Cancel01Icon} />
            </Pill.Button>
          </Pill>
        </div>
      ))}
    </div>
  ),
};
