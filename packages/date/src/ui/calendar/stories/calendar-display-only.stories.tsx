import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "../calendar";

const DisplayOnlyDemo = () => (
  <div className="mx-auto w-fit rounded-lg border bg-background p-4 shadow-sm">
    <Calendar className="rounded-lg border" />
  </div>
);

const meta: Meta = {
  title: "Components/Calendar/DisplayOnly",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DisplayOnly: Story = {
  render: () => <DisplayOnlyDemo />,
};
