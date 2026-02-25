import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Calendar } from "../calendar";

const CaptionDropdownDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto w-fit rounded-lg border bg-background p-4 shadow-sm">
      <Calendar
        captionLayout="dropdown"
        className="rounded-lg border"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
    </div>
  );
};

const meta: Meta = {
  title: "Components/Calendar/CaptionDropdown",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CaptionDropdown: Story = {
  render: () => <CaptionDropdownDemo />,
};
