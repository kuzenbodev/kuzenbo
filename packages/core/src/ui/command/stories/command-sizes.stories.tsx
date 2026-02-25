import type { StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";

import { Command } from "../command";
import { baseMeta } from "./command-story-shared";

export default {
  ...baseMeta,
  title: "Components/Command/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const Sizes: Story = {
  render: () => (
    <div className="grid w-[28rem] gap-4">
      {sizes.map((size) => (
        <div className="space-y-2" key={size}>
          <p className="text-sm text-muted-foreground uppercase">{size}</p>
          <Command className="rounded-lg border" size={size}>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group heading="Suggestions">
                <Command.Item>Calendar</Command.Item>
                <Command.Item>Search Emoji</Command.Item>
              </Command.Group>
              <Command.Separator />
              <Command.Group heading="Settings">
                <Command.Item>
                  Profile
                  <Command.Shortcut>⌘P</Command.Shortcut>
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Root size cascades to input/list/group/item/empty/shortcut with optional child overrides.",
      },
    },
  },
};
