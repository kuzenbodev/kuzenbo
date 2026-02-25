import type { Meta, StoryObj } from "@storybook/react";

import { Meter } from "../meter";

export const baseMeta = {
  title: "Components/Meter",
  component: Meter,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number", min: 0, max: 100, step: 5 },
  },
} satisfies Meta<typeof Meter>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <div className="w-64">
      <Meter {...args}>
        <Meter.Label>Storage</Meter.Label>
        <Meter.Value />
      </Meter>
    </div>
  ),
};
