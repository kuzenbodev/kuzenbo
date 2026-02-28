import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { DatesProvider } from "../../dates-provider";
import { TimeGrid } from "../time-grid";
import { TimeValue } from "../time-value";

export const baseMeta = {
  component: TimeGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/TimeGrid",
} satisfies Meta<typeof TimeGrid>;

type Story = StoryObj<typeof baseMeta>;

const ConstraintsExample = () => {
  const [value, setValue] = useState<string | null>("10:30");

  const handleChange = useCallback((nextValue: string | null) => {
    setValue(nextValue);
  }, []);

  return (
    <DatesProvider>
      <div className="flex max-w-sm flex-col gap-3">
        <TimeGrid
          allowDeselect
          interval={30}
          maxTime="16:00"
          minTime="09:00"
          value={value}
          onChange={handleChange}
        />
        <TimeValue value={value ?? ""} />
      </div>
    </DatesProvider>
  );
};

export const Default: Story = {
  render: () => (
    <DatesProvider>
      <TimeGrid interval={15} />
    </DatesProvider>
  ),
};

export const Constraints: Story = {
  render: ConstraintsExample,
};

export const CustomData: Story = {
  render: () => (
    <DatesProvider>
      <TimeGrid
        allowDeselect
        data={["08:00", "09:15", "10:45", "13:30", "16:00"]}
      />
    </DatesProvider>
  ),
};
