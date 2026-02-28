import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "../skeleton";

export const baseMeta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => <Skeleton className="h-5 w-40" />,
};

export const CardLayout: Story = {
  render: () => (
    <div className="border-border bg-card grid w-[360px] gap-3 rounded-md border p-4">
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-24 w-full" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div className="grid w-[420px] gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[92%]" />
      <Skeleton className="h-4 w-[84%]" />
      <Skeleton className="h-4 w-[68%]" />
    </div>
  ),
};
