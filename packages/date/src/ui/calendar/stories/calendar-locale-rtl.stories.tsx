import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { arSA } from "react-day-picker/locale";

import { Calendar } from "../calendar";

const LocaleRtlDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="mx-auto w-fit rounded-lg border bg-background p-4 shadow-sm">
      <Calendar
        captionLayout="dropdown"
        className="rounded-lg border"
        dir="rtl"
        locale={arSA}
        mode="single"
        onSelect={setDate}
        selected={date}
      />
    </div>
  );
};

const meta: Meta = {
  title: "Components/Calendar/LocaleRtl",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LocaleRtl: Story = {
  render: () => <LocaleRtlDemo />,
};
