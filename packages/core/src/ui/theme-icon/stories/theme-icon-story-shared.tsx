import type { Meta, StoryObj } from "@storybook/react";

import { SunIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ThemeIcon } from "../theme-icon";

const variantOptions = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "link",
  "warning",
  "danger",
  "info",
  "success",
] as const;

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/ThemeIcon",
  component: ThemeIcon,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
} satisfies Meta<typeof ThemeIcon>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
  },
  render: (args) => (
    <ThemeIcon {...args} aria-label="Operations dashboard icon">
      <HugeiconsIcon icon={SunIcon} />
    </ThemeIcon>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-3">
      {variantOptions.map((variant) => (
        <div
          className="flex items-center gap-2 rounded-md border border-border bg-card p-2 text-xs"
          key={variant}
        >
          <ThemeIcon
            aria-label={`${variant} variant icon`}
            size="sm"
            variant={variant}
          >
            <HugeiconsIcon icon={SunIcon} />
          </ThemeIcon>
          <span className="capitalize">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizeOptions.map((size) => (
        <ThemeIcon aria-label={`${size} theme icon`} key={size} size={size}>
          <HugeiconsIcon icon={SunIcon} />
        </ThemeIcon>
      ))}
    </div>
  ),
};
