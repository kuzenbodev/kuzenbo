import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import type { DatePickerValue } from "../../types";

import { DatesProvider } from "../../dates-provider";
import { YearPickerInput } from "../year-picker-input";

export const baseMeta = {
  title: "Components/Date/YearPickerInput",
  component: YearPickerInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof YearPickerInput>;

type Story = StoryObj<typeof baseMeta>;

const RangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>([null, null]);

  const handleChange = useCallback((nextValue: DatePickerValue) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <YearPickerInput
        placeholder="Pick year range"
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
      <YearPickerInput placeholder="Pick year" />
    </DatesProvider>
  ),
};

export const Range: Story = {
  render: RangeExample,
};

export const Multiple: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <YearPickerInput
        defaultValue={[new Date(2023, 0, 1), new Date(2026, 0, 1)]}
        placeholder="Pick multiple years"
        selectionMode="multiple"
      />
    </DatesProvider>
  ),
};
