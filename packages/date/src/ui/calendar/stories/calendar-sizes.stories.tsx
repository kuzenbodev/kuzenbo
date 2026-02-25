import type { Meta, StoryObj } from "@storybook/react";

import { Calendar, type CalendarSize } from "../calendar";

const CALENDAR_SIZE_ORDER: readonly CalendarSize[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
];

const SizesDemo = () => (
  <div className="grid gap-4">
    {CALENDAR_SIZE_ORDER.map((size) => (
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
          size={size}
        />
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: "Components/Calendar/Sizes",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: () => <SizesDemo />,
};
