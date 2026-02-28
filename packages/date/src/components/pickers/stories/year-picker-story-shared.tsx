import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import type { DatePickerValue } from "../../types";

import { DatesProvider } from "../../dates-provider";
import { YearPicker } from "../year-picker";

export const baseMeta = {
  title: "Components/YearPicker",
  component: YearPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof YearPicker>;

type Story = StoryObj<typeof baseMeta>;

const ControlledRangeExample = () => {
  const [value, setValue] = useState<DatePickerValue>([null, null]);

  const handleChange = useCallback((nextValue: DatePickerValue) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <YearPicker
        defaultYear={new Date(2026, 0, 1)}
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
      <YearPicker defaultYear={new Date(2026, 0, 1)} selectionMode="single" />
    </DatesProvider>
  ),
};

export const ControlledRange: Story = {
  render: ControlledRangeExample,
};

export const UncontrolledMultiple: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <YearPicker defaultYear={new Date(2026, 0, 1)} selectionMode="multiple" />
    </DatesProvider>
  ),
};
