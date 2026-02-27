import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import type { DatePickerValue } from "../../types";

import { DatesProvider } from "../../dates-provider";
import { MonthPickerInput } from "../month-picker-input";

export const baseMeta = {
  title: "Components/Date/MonthPickerInput",
  component: MonthPickerInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MonthPickerInput>;

type Story = StoryObj<typeof baseMeta>;

const RangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>([null, null]);

  const handleChange = useCallback((nextValue: DatePickerValue) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <MonthPickerInput
        placeholder="Pick quarter range"
        selectionMode="range"
        value={value}
        onChange={handleChange}
      />
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <MonthPickerInput placeholder="Pick month" />
    </DatesProvider>
  ),
};

export const Range: Story = {
  render: RangeExample,
};

export const Multiple: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <MonthPickerInput
        defaultValue={[new Date(2026, 0, 1), new Date(2026, 2, 1)]}
        placeholder="Pick multiple months"
        selectionMode="multiple"
      />
    </DatesProvider>
  ),
};
