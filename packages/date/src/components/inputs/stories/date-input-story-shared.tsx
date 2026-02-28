import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { DateInput } from "../date-input";

export const baseMeta = {
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/DateInput",
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

const DropdownTypingClearableExample = () => {
  const [opened, setOpened] = useState(true);
  const [value, setValue] = useState<Date | null>(new Date(2026, 1, 14));

  const closeDropdown = useCallback(() => {
    setOpened(false);
  }, []);

  const openDropdown = useCallback(() => {
    setOpened(true);
  }, []);

  const clearValue = useCallback(() => {
    setValue(null);
  }, []);

  const handleChange = useCallback((nextValue: Date | null) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider locale="en-US">
      <div className="flex max-w-sm flex-col gap-3">
        <DateInput
          allowDeselect
          clearable
          opened={opened}
          placeholder="YYYY-MM-DD"
          value={value}
          onChange={handleChange}
          onOpenedChange={setOpened}
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={openDropdown}>
            Open dropdown
          </button>
          <button type="button" onClick={closeDropdown}>
            Close dropdown
          </button>
          <button type="button" onClick={clearValue}>
            Clear value
          </button>
        </div>
      </div>
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

export const ClearableAllowDeselect: Story = {
  render: () => (
    <DatesProvider locale="en-US">
      <DateInput
        allowDeselect
        clearable
        defaultValue={new Date(2026, 1, 14)}
        placeholder="YYYY-MM-DD"
      />
    </DatesProvider>
  ),
};

export const DropdownTypingClearable: Story = {
  render: DropdownTypingClearableExample,
};
