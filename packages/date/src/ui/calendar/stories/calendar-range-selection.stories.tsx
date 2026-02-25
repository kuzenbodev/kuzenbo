import type { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";

import { useState } from "react";

import { Calendar } from "../calendar";

const RangeSelectionDemo = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 13),
  });

  return (
    <div className="mx-auto w-fit rounded-lg border bg-background p-4 shadow-sm">
      <Calendar
        className="rounded-lg border"
        defaultMonth={range?.from}
        mode="range"
        onSelect={setRange}
        selected={range}
      />
    </div>
  );
};

const meta: Meta = {
  title: "Components/Calendar/RangeSelection",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const RangeSelection: Story = {
  render: () => <RangeSelectionDemo />,
};
