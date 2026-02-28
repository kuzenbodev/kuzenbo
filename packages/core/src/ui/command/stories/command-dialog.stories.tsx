import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button } from "../../button/button";
import { Command } from "../command";
import { CommandDialog } from "../command-dialog";
import { baseMeta } from "./command-story-shared";

export default {
  ...baseMeta,
  title: "Components/Command/Dialog",
};

type Story = StoryObj<typeof baseMeta>;

const CommandDialogStory = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleOpen} variant="outline">
        Open Command Menu
      </Button>
      <CommandDialog
        description="Type to search commands"
        onOpenChange={setOpen}
        open={open}
        title="Command Menu"
      >
        <Command className="w-[28rem]">
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
              <Command.Item>
                Billing
                <Command.Shortcut>⌘B</Command.Shortcut>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </CommandDialog>
    </div>
  );
};

export const Dialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Recommended dialog composition: `CommandDialog` wrapping an internal `Command` surface.",
      },
    },
  },
  render: () => <CommandDialogStory />,
};
