import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Calendar, type CalendarSize } from "../calendar";

const sizeOptions: readonly CalendarSize[] = ["xs", "sm", "md", "lg", "xl"];

interface WeekNumberDemoProps {
  numberOfMonths: number;
  size: CalendarSize;
}

const WeekNumbersDemo = ({ numberOfMonths, size }: WeekNumberDemoProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto w-fit rounded-lg border bg-background p-4 shadow-sm">
      <Calendar
        className="rounded-lg border"
        defaultMonth={new Date(2025, 0)}
        mode="single"
        numberOfMonths={numberOfMonths}
        onSelect={setDate}
        selected={date}
        showWeekNumber
        size={size}
      />
    </div>
  );
};

const meta = {
  title: "Components/Calendar/WeekNumbers",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    numberOfMonths: {
      control: "number",
      table: {
        category: "Layout",
      },
    },
    size: {
      control: "select",
      options: sizeOptions,
      table: {
        category: "Style",
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WeekNumbers: Story = {
  args: {
    numberOfMonths: 2,
    size: "md",
  },
  render: ({ numberOfMonths = 2, size = "md" }) => (
    <WeekNumbersDemo numberOfMonths={numberOfMonths} size={size} />
  ),
};

export const WeekNumberSizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {sizeOptions.map((size) => (
        <div
          className="w-fit rounded-lg border border-border bg-background p-3 shadow-sm"
          key={size}
        >
          <div className="mb-2 text-xs font-medium text-muted-foreground uppercase">
            {size}
          </div>
          <Calendar
            className="rounded-lg border border-border"
            defaultMonth={new Date(2025, 0)}
            mode="single"
            selected={new Date(2025, 0, 15)}
            showWeekNumber
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};
