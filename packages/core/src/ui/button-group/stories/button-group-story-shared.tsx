import {
  Add01Icon,
  Cancel01Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { ButtonGroup } from "../button-group";

const SIZE_OPTIONS = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: SIZE_OPTIONS,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    size: "md",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">All contracts</Button>
      <Button variant="outline">Needs legal review</Button>
    </ButtonGroup>
  ),
};

export const VerticalGroup: Story = {
  args: {
    orientation: "vertical",
    size: "md",
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Overview</Button>
      <Button variant="outline">Pipeline</Button>
      <Button variant="outline">Renewals</Button>
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <ButtonGroup>
      <Button aria-label="Search invoices" size="icon-sm" variant="outline">
        <HugeiconsIcon icon={SearchIcon} />
      </Button>
      <Button aria-label="Create invoice" size="icon-sm" variant="outline">
        <HugeiconsIcon icon={Add01Icon} />
      </Button>
      <Button aria-label="Clear filters" size="icon-sm" variant="outline">
        <HugeiconsIcon icon={Cancel01Icon} />
      </Button>
    </ButtonGroup>
  ),
};

export const SizeMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {SIZE_OPTIONS.map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <span className="text-muted-foreground w-8 text-xs font-medium uppercase">
            {size}
          </span>
          <ButtonGroup size={size}>
            <Button variant="outline">Bulk assign owner</Button>
            <Button variant="outline">Escalate to legal</Button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};
