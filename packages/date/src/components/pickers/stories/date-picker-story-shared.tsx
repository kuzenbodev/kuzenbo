import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import type { DatePickerProps } from "../date-picker";

import { DatesProvider } from "../../dates-provider";
import { DatePicker } from "../date-picker";

export const baseMeta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof baseMeta>;

const ControlledRangeExample = () => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  const handleChange = useCallback<NonNullable<DatePickerProps["onChange"]>>(
    (nextValue) => {
      setValue(nextValue as [Date | null, Date | null]);
    },
    []
  );

  return (
    <DatesProvider locale="en-US">
      <DatePicker
        defaultMonth={new Date(2026, 1, 1)}
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
      <DatePicker defaultMonth={new Date(2026, 1, 1)} selectionMode="single" />
    </DatesProvider>
  ),
};

export const ControlledRange: Story = {
  render: ControlledRangeExample,
};

export const UncontrolledMultiple: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <DatePicker
        defaultMonth={new Date(2026, 1, 1)}
        selectionMode="multiple"
      />
    </DatesProvider>
  ),
};
