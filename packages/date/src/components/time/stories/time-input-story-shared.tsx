import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { TimeInput } from "../time-input";

export const baseMeta = {
  title: "Components/TimeInput",
  component: TimeInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TimeInput>;

type Story = StoryObj<typeof baseMeta>;

const TwelveHourExample = () => {
  const [value, setValue] = useState("08:15 PM");

  const handleChange = useCallback((nextValue: string) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider>
      <TimeInput
        clearable
        format="12h"
        value={value}
        withSeconds
        onChange={handleChange}
      />
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider>
      <TimeInput defaultValue="09:00" />
    </DatesProvider>
  ),
};

export const TwelveHourClearable: Story = {
  render: TwelveHourExample,
};

export const MinMax: Story = {
  render: () => (
    <DatesProvider>
      <TimeInput defaultValue="17:30" max="18:00" min="09:00" withSeconds />
    </DatesProvider>
  ),
};
