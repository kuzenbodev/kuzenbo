import type { Meta, StoryObj } from "@storybook/react";

import { Command } from "../command";

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  component: Command,
  parameters: {
    docs: {
      description: {
        component:
          "`Command` and child surfaces share one size contract (`xs|sm|md|lg|xl`) with child-level overrides available.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Command",
} satisfies Meta<typeof Command>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>Calendar</Command.Item>
          <Command.Item>Search Emoji</Command.Item>
          <Command.Item disabled>Calculator</Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>
            Profile
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            Billing
            <Command.Shortcut>⌘B</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            Settings
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
};
