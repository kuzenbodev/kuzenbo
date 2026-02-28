import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { TimePicker } from "../time-picker";
import { TimeValue } from "../time-value";

export const baseMeta = {
  title: "Components/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TimePicker>;

type Story = StoryObj<typeof baseMeta>;

const TimePickerPresetsExample = () => {
  const [value, setValue] = useState("09:00:00");

  const setStandup = useCallback(() => {
    setValue("07:30:00");
  }, []);

  const setLunch = useCallback(() => {
    setValue("13:00:00");
  }, []);

  const setWrapUp = useCallback(() => {
    setValue("17:30:00");
  }, []);

  return (
    <DatesProvider>
      <div className="flex max-w-sm flex-col gap-3">
        <TimePicker
          interval={15}
          value={value}
          withSeconds
          onChange={setValue}
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={setStandup}>
            Standup
          </button>
          <button type="button" onClick={setLunch}>
            Lunch
          </button>
          <button type="button" onClick={setWrapUp}>
            Wrap-up
          </button>
        </div>
        <TimeValue value={value} withSeconds />
      </div>
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider>
      <TimePicker interval={30} withSeconds />
    </DatesProvider>
  ),
};

export const Presets: Story = {
  render: TimePickerPresetsExample,
};

export const ControlsList: Story = {
  render: () => (
    <DatesProvider>
      <TimePicker
        defaultValue="08:30 AM"
        format="12h"
        interval={15}
        minTime="07:00 AM"
        withControlsList
      />
    </DatesProvider>
  ),
};
