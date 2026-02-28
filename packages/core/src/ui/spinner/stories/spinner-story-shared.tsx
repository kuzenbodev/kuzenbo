import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Spinner } from "../spinner";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => <Spinner {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizeOptions.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="border-border bg-card text-muted-foreground inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
      <Spinner size="sm" />
      Syncing data...
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div className="border-border bg-card relative w-72 overflow-hidden rounded-md border p-4">
      <div className="space-y-2">
        <div className="bg-muted h-4 w-1/3 rounded" />
        <div className="bg-muted h-4 w-2/3 rounded" />
        <div className="bg-muted h-4 w-1/2 rounded" />
      </div>
      <div className="bg-background/70 absolute inset-0 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    </div>
  ),
};

export const ButtonLoadingAlignment: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button isLoading size="xs">
        XS
      </Button>
      <Button isLoading size="sm">
        SM
      </Button>
      <Button isLoading size="md">
        MD
      </Button>
      <Button isLoading size="lg">
        LG
      </Button>
      <Button isLoading size="xl">
        XL
      </Button>
    </div>
  ),
};
