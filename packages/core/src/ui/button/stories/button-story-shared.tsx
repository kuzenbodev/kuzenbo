import type { Meta, StoryObj } from "@storybook/react";

import {
  Add01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  SearchIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { ButtonGroup } from "../../button-group/button-group";
import { Button } from "../button";

export const baseMeta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "danger", "link"],
    },
    size: {
      control: "select",
      options: [
        "md",
        "xs",
        "sm",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
        "icon-xl",
      ],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: { children: "Create invoice" },
};

export const Outline: Story = {
  args: { children: "Review SLA", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Save draft", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Skip for now", variant: "ghost" },
};

export const Danger: Story = {
  args: { children: "Revoke API key", variant: "danger" },
};

export const Link: Story = {
  args: { children: "View audit trail", variant: "link" },
};

export const Loading: Story = {
  args: { children: "Provisioning workspace", isLoading: true },
};

export const Disabled: Story = {
  args: { children: "Access restricted", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Quick note</Button>
      <Button size="sm">Assign task</Button>
      <Button size="md">Create ticket</Button>
      <Button size="lg">Export report</Button>
      <Button size="xl">Schedule onboarding</Button>
    </div>
  ),
};

export const ActionsWithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant="outline">
        <HugeiconsIcon icon={SearchIcon} />
        Find customer record
      </Button>
      <Button>
        Create renewal quote
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
      <Button variant="secondary">
        <HugeiconsIcon icon={Tick02Icon} />
        Approve contract
      </Button>
    </div>
  ),
};

export const IconToolbarActions: Story = {
  render: () => (
    <ButtonGroup>
      <Button
        aria-label="Filter opportunities"
        size="icon-sm"
        variant="outline"
      >
        <HugeiconsIcon icon={SearchIcon} />
      </Button>
      <Button aria-label="Add enterprise seat" size="icon-sm" variant="outline">
        <HugeiconsIcon icon={Add01Icon} />
      </Button>
      <Button
        aria-label="Clear active filters"
        size="icon-sm"
        variant="outline"
      >
        <HugeiconsIcon icon={Cancel01Icon} />
      </Button>
    </ButtonGroup>
  ),
};

export const UploadFlowActions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button isLoading size="sm">
        Syncing billing CSV
      </Button>
      <Button size="sm" variant="outline">
        Pause import
      </Button>
      <Button size="sm" variant="ghost">
        View sync log
      </Button>
    </div>
  ),
};

export const DestructiveConfirmationActions: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Keep workspace</Button>
      <Button variant="danger">
        <HugeiconsIcon icon={Cancel01Icon} />
        Delete organization
      </Button>
    </div>
  ),
};

export const IconSizesMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="xs" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          XS
        </Button>
        <Button size="sm" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          SM
        </Button>
        <Button size="md" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          MD
        </Button>
        <Button size="lg" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          LG
        </Button>
        <Button size="xl" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          XL
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button aria-label="Icon XS" size="icon-xs" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
        </Button>
        <Button aria-label="Icon SM" size="icon-sm" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
        </Button>
        <Button aria-label="Icon MD" size="icon" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
        </Button>
        <Button aria-label="Icon LG" size="icon-lg" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
        </Button>
        <Button aria-label="Icon XL" size="icon-xl" variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
        </Button>
      </div>
    </div>
  ),
};
