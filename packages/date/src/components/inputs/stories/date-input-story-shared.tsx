import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { DateInput } from "../date-input";

export const baseMeta = {
  title: "Components/Date/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateInput>;

type Story = StoryObj<typeof baseMeta>;

const ControlledExample = () => {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 14));

  const handleChange = useCallback((nextValue: Date | null) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <DateInput
        placeholder="YYYY-MM-DD"
        value={value}
        onChange={handleChange}
      />
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <DateInput placeholder="YYYY-MM-DD" />
    </DatesProvider>
  ),
};

export const Controlled: Story = {
  render: ControlledExample,
};

export const MinMax: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <DateInput
        maxDate={new Date(2026, 1, 20)}
        minDate={new Date(2026, 1, 10)}
        placeholder="YYYY-MM-DD"
        value={new Date(2026, 1, 14)}
      />
    </DatesProvider>
  ),
};
