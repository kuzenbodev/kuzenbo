import {
  ArrowRight01Icon,
  Cancel01Icon,
  SearchIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";

export const baseMeta = {
  argTypes: {
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    size: {
      control: "select",
      options: ["md", "xs", "sm", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "danger", "link"],
    },
  },
  component: Button,
  tags: ["autodocs"],
  title: "Components/Button",
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
