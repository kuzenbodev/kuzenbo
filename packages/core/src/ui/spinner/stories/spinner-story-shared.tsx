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
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
      <Spinner size="sm" />
      Syncing data...
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div className="relative w-72 overflow-hidden rounded-md border border-border bg-card p-4">
      <div className="space-y-2">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/70">
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
