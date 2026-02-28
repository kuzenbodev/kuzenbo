import type { Meta, StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { Menubar } from "../menubar";

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  title: "Components/Menubar",
  component: Menubar,
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
          "Menubar root size scales both trigger row density and dropdown child surfaces (`content`, `item`, `label`, `shortcut`).",
      },
    },
  },
} satisfies Meta<typeof Menubar>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>New release note</Menubar.Item>
          <Menubar.Item>
            Save draft
            <Menubar.Shortcut>⌘S</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Close editor</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.CheckboxItem defaultChecked>
            Incident timeline panel
          </Menubar.CheckboxItem>
          <Menubar.CheckboxItem defaultChecked>
            Deployment logs panel
          </Menubar.CheckboxItem>
          <Menubar.CheckboxItem>Audit panel</Menubar.CheckboxItem>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  ),
};

export const NestedSubmenu: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Duplicate report</Menubar.Item>
          <Menubar.Sub>
            <Menubar.SubTrigger>Export report</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>PDF</Menubar.Item>
              <Menubar.Item>CSV</Menubar.Item>
              <Menubar.Item>JSON</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          <Menubar.Item>Send to stakeholders</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>Publish</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Publish to staging</Menubar.Item>
          <Menubar.Item disabled>
            Publish to production (admin only)
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item disabled variant="danger">
            Delete release tag (owner only)
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-8">
      {sizes.map((size) => (
        <Menubar key={size} size={size}>
          <Menubar.Menu>
            <Menubar.Trigger>Actions ({size})</Menubar.Trigger>
            <Menubar.Content>
              <Menubar.Group>
                <Menubar.Label>Team workflow</Menubar.Label>
                <Menubar.Item>
                  Open runbook
                  <Menubar.Shortcut>⌘O</Menubar.Shortcut>
                </Menubar.Item>
                <Menubar.Item>
                  Assign incident
                  <Menubar.Shortcut>⌥⌘A</Menubar.Shortcut>
                </Menubar.Item>
              </Menubar.Group>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar>
      ))}
    </div>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>Workspace</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Backdrop />
          <Menubar.Positioner>
            <Menubar.Popup>
              <Menubar.Arrow />
              <Menubar.Group>
                <Menubar.Label>Workspace</Menubar.Label>
                <Menubar.Item>Team settings</Menubar.Item>
                <Menubar.LinkItem href="/workspace/acme/members">
                  Members
                </Menubar.LinkItem>
              </Menubar.Group>
              <Menubar.Separator />
              <Menubar.Item variant="danger">Archive workspace</Menubar.Item>
            </Menubar.Popup>
          </Menubar.Positioner>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar>
  ),
};
