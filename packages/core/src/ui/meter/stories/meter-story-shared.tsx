import type { Meta, StoryObj } from "@storybook/react";

import { Meter } from "../meter";

export const baseMeta = {
  argTypes: {
    value: { control: "number", max: 100, min: 0, step: 5 },
  },
  component: Meter,
  tags: ["autodocs"],
  title: "Components/Meter",
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
