import type { Meta, StoryObj } from "@storybook/react";

import { Kbd } from "../kbd";

const KBD_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: KBD_SIZES,
    },
  },
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component:
          "Kbd primitives support the unified `UISize` contract and inherit size from `Kbd.Group` unless explicitly overridden.",
      },
    },
  },
  tags: ["autodocs"],
  title: "Components/Kbd",
} satisfies Meta<typeof Kbd>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="grid gap-4">
      <div className="text-sm">Global command palette</div>
      <Kbd.Group size={args.size}>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </Kbd.Group>
      <div className="flex flex-wrap items-center gap-2">
        {KBD_SIZES.map((size) => (
          <Kbd key={size} size={size}>
            {size}
          </Kbd>
        ))}
      </div>
    </div>
  ),
};

export const KeyCombo: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="grid gap-3 text-sm">
      <div className="flex items-center justify-between gap-4">
        <span>Open procurement search</span>
        <Kbd.Group size={args.size}>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>F</Kbd>
        </Kbd.Group>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Approve selected request</span>
        <Kbd.Group size={args.size}>
          <Kbd>Ctrl</Kbd>
          <Kbd>Enter</Kbd>
        </Kbd.Group>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span>Create follow-up task</span>
        <Kbd.Group size={args.size}>
          <Kbd>Ctrl</Kbd>
          <Kbd>Alt</Kbd>
          <Kbd>T</Kbd>
        </Kbd.Group>
      </div>
    </div>
  ),
};

export const CommandList: Story = {
  render: () => (
    <div className="border-border bg-card grid w-[360px] gap-2 rounded-md border p-3 text-sm">
      <div className="flex items-center justify-between">
        <span>Sync vendor master data</span>
        <Kbd.Group size="sm">
          <Kbd>Ctrl</Kbd>
          <Kbd>S</Kbd>
        </Kbd.Group>
      </div>
      <div className="flex items-center justify-between">
        <span>Open SLA incident timeline</span>
        <Kbd.Group size="sm">
          <Kbd>G</Kbd>
          <Kbd>I</Kbd>
        </Kbd.Group>
      </div>
      <div className="flex items-center justify-between">
        <span>Jump to approvals inbox</span>
        <Kbd.Group size="sm">
          <Kbd>G</Kbd>
          <Kbd>A</Kbd>
        </Kbd.Group>
      </div>
    </div>
  ),
};
