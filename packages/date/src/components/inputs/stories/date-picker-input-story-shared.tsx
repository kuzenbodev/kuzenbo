import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import type { DatePickerValue } from "../../types";

import { DatesProvider } from "../../dates-provider";
import { DatePickerInput } from "../date-picker-input";

export const baseMeta = {
  title: "Components/Date/DatePickerInput",
  component: DatePickerInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePickerInput>;

type Story = StoryObj<typeof baseMeta>;

const RangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>([null, null]);

  const handleChange = useCallback((nextValue: DatePickerValue) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <DatePickerInput
        placeholder="Pick sprint range"
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
      <DatePickerInput placeholder="Pick a release date" />
    </DatesProvider>
  ),
};

export const Range: Story = {
  render: RangeExample,
};

export const Multiple: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <DatePickerInput
        defaultValue={[new Date(2026, 1, 5), new Date(2026, 1, 8)]}
        placeholder="Pick multiple dates"
        selectionMode="multiple"
      />
    </DatesProvider>
  ),
};
