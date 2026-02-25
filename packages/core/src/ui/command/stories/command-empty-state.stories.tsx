import type { StoryObj } from "@storybook/react";

import { Command } from "../command";
import { baseMeta } from "./command-story-shared";

export default {
  ...baseMeta,
  title: "Components/Command/EmptyState",
};
type Story = StoryObj<typeof baseMeta>;

export const EmptyState: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal cmdk-compatible empty state composition with no matching items.",
      },
    },
  },
};
