import type { StoryObj } from "@storybook/react";

import { Command } from "../command";
import { baseMeta } from "./command-story-shared";

export default {
  ...baseMeta,
  title: "Components/Command/GroupedCommands",
};
type Story = StoryObj<typeof baseMeta>;

export const GroupedCommands: Story = {
  parameters: {
    docs: {
      description: {
        story: "Grouped command palette pattern aligned with guidance.",
      },
    },
  },
  render: () => (
    <Command className="w-96 rounded-lg border">
      <Command.Input placeholder="Search workspace commands..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Navigation">
          <Command.Item>
            Home
            <Command.Shortcut>⌘H</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            Inbox
            <Command.Shortcut>⌘I</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            Documents
            <Command.Shortcut>⌘D</Command.Shortcut>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Actions">
          <Command.Item>
            New File
            <Command.Shortcut>⌘N</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            New Folder
            <Command.Shortcut>⇧⌘N</Command.Shortcut>
          </Command.Item>
          <Command.Item>Paste</Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
};
