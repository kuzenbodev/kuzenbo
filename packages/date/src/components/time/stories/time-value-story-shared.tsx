import type { Meta, StoryObj } from "@storybook/react";

import { DatesProvider } from "../../dates-provider";
import { TimeValue } from "../time-value";

export const baseMeta = {
  title: "Components/TimeValue",
  component: TimeValue,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TimeValue>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <DatesProvider>
      <TimeValue value="14:25:36" withSeconds />
    </DatesProvider>
  ),
};

export const TwelveHour: Story = {
  render: () => (
    <DatesProvider>
      <TimeValue format="12h" value="21:45:12" withSeconds />
    </DatesProvider>
  ),
};

export const DateObject: Story = {
  render: () => (
    <DatesProvider>
      <TimeValue value={new Date(2026, 1, 14, 8, 5, 9)} withSeconds />
    </DatesProvider>
  ),
};
