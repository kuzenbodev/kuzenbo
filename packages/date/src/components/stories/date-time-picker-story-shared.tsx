import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { DateTimePicker } from "../date-time-picker";
import { DatesProvider } from "../dates-provider";

export const baseMeta = {
  title: "Components/Date/DateTimePicker",
  component: DateTimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateTimePicker>;

type Story = StoryObj<typeof baseMeta>;

const DateTimePresetsExample = () => {
  const [value, setValue] = useState<Date | null>(
    new Date(2026, 1, 14, 9, 0, 0)
  );

  const setDstMorning = useCallback(() => {
    setValue(new Date(2026, 2, 8, 8, 30, 0));
  }, []);

  const setDstEvening = useCallback(() => {
    setValue(new Date(2026, 2, 8, 17, 45, 0));
  }, []);

  return (
    <DatesProvider locale="en-US" timeZone="America/New_York">
      <div className="flex max-w-sm flex-col gap-3">
        <DateTimePicker value={value} withSeconds onChange={setValue} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={setDstMorning}>
            DST Morning
          </button>
          <button type="button" onClick={setDstEvening}>
            DST Evening
          </button>
        </div>
      </div>
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider locale="en-US" timeZone="America/New_York">
      <DateTimePicker withSeconds />
    </DatesProvider>
  ),
};

export const Presets: Story = {
  render: DateTimePresetsExample,
};

const ControlledExample = () => {
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 14, 9, 0));

  const handleChange = useCallback((nextValue: Date | null) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US" timeZone="America/New_York">
      <DateTimePicker value={value} withSeconds onChange={handleChange} />
    </DatesProvider>
  );
};

export const Controlled: Story = {
  render: ControlledExample,
};
