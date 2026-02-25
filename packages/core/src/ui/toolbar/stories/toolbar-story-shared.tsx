import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from "../toolbar";

export const baseMeta = {
  title: "Components/Toolbar",
  component: Toolbar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Toolbar surfaces share the `UISize` contract (`xs | sm | md | lg | xl`) with child override precedence (`child -> nearest group/root -> md`).",
      },
    },
  },
} satisfies Meta<typeof Toolbar>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Toolbar size={args.size}>
      <Toolbar.Group>
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
        <Toolbar.Button>Underline</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button>Align left</Toolbar.Button>
        <Toolbar.Button>Align center</Toolbar.Button>
        <Toolbar.Button>Align right</Toolbar.Button>
      </Toolbar.Group>
    </Toolbar>
  ),
};

export const GroupedActions: Story = {
  render: () => (
    <Toolbar size="md">
      <Toolbar.Group>
        <Toolbar.Button>Assign owner</Toolbar.Button>
        <Toolbar.Button>Set priority</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Button>Move to triage</Toolbar.Button>
        <Toolbar.Button>Start incident</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Link href="/workspace/acme/runbooks/incident-playbook">
          Open runbook
        </Toolbar.Link>
      </Toolbar.Group>
    </Toolbar>
  ),
};

export const WithOverflowMenu: Story = {
  render: () => (
    <Toolbar size="md">
      <Toolbar.Group>
        <Toolbar.Button>Comment</Toolbar.Button>
        <Toolbar.Button>Assign</Toolbar.Button>
        <Toolbar.Button>Snooze</Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Input
          aria-label="Search extra actions"
          placeholder="Search actions"
        />
      </Toolbar.Group>
      <Toolbar.Separator />
      <Toolbar.Group>
        <Toolbar.Link href="/workspace/acme/actions/overflow">
          More actions
        </Toolbar.Link>
      </Toolbar.Group>
    </Toolbar>
  ),
};
