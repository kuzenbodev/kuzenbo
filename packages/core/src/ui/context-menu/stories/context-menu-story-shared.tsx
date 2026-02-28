import type { Meta, StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { ContextMenu } from "../context-menu";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
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
          "ContextMenu uses a shared `xs|sm|md|lg|xl` size contract for root and popup child surfaces, with optional child overrides.",
      },
    },
  },
} satisfies Meta<typeof ContextMenu>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger className="border-border flex h-32 w-72 items-center justify-center rounded-md border border-dashed">
        Incident row: API Gateway latency spike
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Open incident timeline</ContextMenu.Item>
        <ContextMenu.Item>Assign incident owner</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="danger">Archive incident</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger className="border-border flex h-32 w-72 items-center justify-center rounded-md border border-dashed">
        Workspace member: Jordan Lee
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Group>
          <ContextMenu.Label>Team permissions</ContextMenu.Label>
          <ContextMenu.Item>Edit profile</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Change role</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Viewer</ContextMenu.Item>
              <ContextMenu.Item>Editor</ContextMenu.Item>
              <ContextMenu.Item>Admin</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled variant="danger">
          Remove from workspace (owner only)
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger className="border-border flex h-32 w-72 items-center justify-center rounded-md border border-dashed">
        Release branch: release/2026-02
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Create hotfix</ContextMenu.Item>
        <ContextMenu.Item disabled>
          Delete branch (missing permission)
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item disabled variant="danger">
          Force push (admin only)
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-8">
      {sizes.map((size) => (
        <ContextMenu key={size} size={size}>
          <ContextMenu.Trigger className="border-border flex h-16 items-center justify-center rounded-md border border-dashed">
            Table settings ({size})
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Group>
              <ContextMenu.Label>Column visibility</ContextMenu.Label>
              <ContextMenu.CheckboxItem defaultChecked>
                Status column
              </ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem defaultChecked>
                Owner column
              </ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem>
                Incident age column
              </ContextMenu.CheckboxItem>
            </ContextMenu.Group>
          </ContextMenu.Content>
        </ContextMenu>
      ))}
    </div>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenu.Trigger className="border-border flex h-32 w-72 items-center justify-center rounded-md border border-dashed">
        Sprint board card: Release readiness
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Backdrop />
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Arrow />
            <ContextMenu.Group>
              <ContextMenu.Label>Card actions</ContextMenu.Label>
              <ContextMenu.Item>Open task details</ContextMenu.Item>
              <ContextMenu.LinkItem href="/workspace/acme/docs/release-checklist">
                Review release checklist
              </ContextMenu.LinkItem>
            </ContextMenu.Group>
            <ContextMenu.Separator />
            <ContextMenu.Item variant="danger">
              Remove from sprint
            </ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu>
  ),
};
