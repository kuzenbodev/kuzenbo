import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { DatesProvider } from "../dates-provider";
import { MiniCalendar } from "../mini-calendar";

export const baseMeta = {
  component: MiniCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/MiniCalendar",
} satisfies Meta<typeof MiniCalendar>;

type Story = StoryObj<typeof baseMeta>;

const ControlledExample = () => {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 12));

  const handleChange = useCallback((nextValue: Date | null) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <MiniCalendar value={value} onChange={handleChange} />
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <MiniCalendar defaultMonth={new Date(2026, 1, 1)} />
    </DatesProvider>
  ),
};

export const Controlled: Story = {
  render: ControlledExample,
};

export const LocaleRtl: Story = {
  render: () => (
    <DatesProvider direction="rtl" locale="ar-SA">
      <MiniCalendar defaultMonth={new Date(2026, 1, 1)} />
    </DatesProvider>
  ),
};
