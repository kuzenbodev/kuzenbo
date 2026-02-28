import {
  Add01Icon,
  Cancel01Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ButtonGroup } from "../../button-group/button-group";
import { ActionIcon } from "../action-icon";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    size: {
      control: "select",
      options: sizeOptions,
    },
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "danger", "link"],
    },
  },
  component: ActionIcon,
  tags: ["autodocs"],
  title: "Components/ActionIcon",
} satisfies Meta<typeof ActionIcon>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    "aria-label": "Search",
    children: <HugeiconsIcon icon={SearchIcon} />,
  },
};

export const VariantGallery: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ActionIcon aria-label="Default" variant="default">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Outline" variant="outline">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Secondary" variant="secondary">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Ghost" variant="ghost">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Danger" variant="danger">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Link" variant="link">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
    </div>
  ),
};

export const SizesMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {sizeOptions.map((size) => (
        <ActionIcon
          aria-label={`Icon ${size.toUpperCase()}`}
          key={size}
          size={size}
          variant="outline"
        >
          <HugeiconsIcon icon={SearchIcon} />
        </ActionIcon>
      ))}
    </div>
  ),
};

export const InButtonGroup: Story = {
  render: () => (
    <ButtonGroup>
      <ActionIcon aria-label="Search invoices" size="sm" variant="outline">
        <HugeiconsIcon icon={SearchIcon} />
      </ActionIcon>
      <ActionIcon aria-label="Create invoice" size="sm" variant="outline">
        <HugeiconsIcon icon={Add01Icon} />
      </ActionIcon>
      <ActionIcon aria-label="Clear filters" size="sm" variant="outline">
        <HugeiconsIcon icon={Cancel01Icon} />
      </ActionIcon>
    </ButtonGroup>
  ),
};
