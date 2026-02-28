import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import type { InputSize } from "../../input/input";
import { DropdownMenu } from "../dropdown-menu";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "DropdownMenu uses one size contract (`xs|sm|md|lg|xl`) across trigger-root and popup child surfaces. Child size props override inherited size.",
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        Workspace: Acme Platform
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>Workspace actions</DropdownMenu.Label>
          <DropdownMenu.Item>Open workspace settings</DropdownMenu.Item>
          <DropdownMenu.Item>Invite teammate</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">Leave workspace</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        Columns
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>Incident table columns</DropdownMenu.Label>
          <DropdownMenu.CheckboxItem defaultChecked>
            Status
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem defaultChecked>
            Owner
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem defaultChecked>
            Priority
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Escalation SLA</DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Reset to workspace defaults</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        Current workspace
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Open dashboard</DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>Switch workspace</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Acme Platform</DropdownMenu.Item>
            <DropdownMenu.Item>Security Ops</DropdownMenu.Item>
            <DropdownMenu.Item>Customer Success</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Manage access</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-10">
      {sizes.map((size) => (
        <DropdownMenu key={size} size={size}>
          <DropdownMenu.Trigger>Quick actions ({size})</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Label>Release workflow</DropdownMenu.Label>
              <DropdownMenu.Item>
                Start release candidate
                <DropdownMenu.Shortcut>⌘R</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                Rollback deployment
                <DropdownMenu.Shortcut>⇧⌘R</DropdownMenu.Shortcut>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
      ))}
    </div>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        Open account menu
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Backdrop />
        <DropdownMenu.Positioner>
          <DropdownMenu.Popup>
            <DropdownMenu.Arrow />
            <DropdownMenu.Group>
              <DropdownMenu.Label>Account</DropdownMenu.Label>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
              <DropdownMenu.LinkItem href="/workspace/acme/billing">
                Billing and plans
              </DropdownMenu.LinkItem>
            </DropdownMenu.Group>
            <DropdownMenu.Separator />
            <DropdownMenu.Item variant="danger">Sign out</DropdownMenu.Item>
          </DropdownMenu.Popup>
        </DropdownMenu.Positioner>
      </DropdownMenu.Portal>
    </DropdownMenu>
  ),
};
