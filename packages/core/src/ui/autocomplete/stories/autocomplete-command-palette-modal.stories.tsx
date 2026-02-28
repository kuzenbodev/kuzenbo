import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface CommandItem {
  value: string;
  label: string;
  shortcut: string;
}

interface CommandGroup {
  value: string;
  items: CommandItem[];
}

const groupedCommands: CommandGroup[] = [
  {
    items: [
      { label: "Go to dashboard", shortcut: "G D", value: "go-dashboard" },
      { label: "Open inbox", shortcut: "G I", value: "go-inbox" },
      { label: "Open settings", shortcut: "G S", value: "go-settings" },
    ],
    value: "Navigation",
  },
  {
    items: [
      {
        label: "Create support ticket",
        shortcut: "C T",
        value: "create-ticket",
      },
      { label: "Create workflow", shortcut: "C W", value: "new-workflow" },
      { label: "Invite teammate", shortcut: "I U", value: "invite-user" },
    ],
    value: "Actions",
  },
];

const CommandPaletteModalDemo = () => {
  const [selectedLabel, setSelectedLabel] = useState("Nothing selected");

  const handleValueChange = useCallback((value: string) => {
    setSelectedLabel(value);
  }, []);

  return (
    <div className="w-[28rem]">
      <Autocomplete
        autoHighlight="always"
        items={groupedCommands}
        keepHighlight
        modal
        onValueChange={handleValueChange}
        openOnInputClick
      >
        <Autocomplete.Input placeholder="Search actions and pages..." />
        <Autocomplete.Backdrop className="bg-foreground/20 fixed inset-0" />
        <Autocomplete.Content>
          <Autocomplete.Arrow className="border-border bg-popover -mt-2 ml-6 size-3 rotate-45 border-t border-l" />
          <Autocomplete.Empty>No commands available.</Autocomplete.Empty>
          <Autocomplete.List>
            {(group: CommandGroup) => (
              <Autocomplete.Group key={group.value} items={group.items}>
                <Autocomplete.GroupLabel>{group.value}</Autocomplete.GroupLabel>
                <Autocomplete.Collection>
                  {(command: CommandItem) => (
                    <Autocomplete.Item key={command.value} value={command}>
                      <div className="flex w-full items-center justify-between gap-4">
                        <span>{command.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {command.shortcut}
                        </span>
                      </div>
                    </Autocomplete.Item>
                  )}
                </Autocomplete.Collection>
              </Autocomplete.Group>
            )}
          </Autocomplete.List>
          <Autocomplete.Status>
            Last action: {selectedLabel}
          </Autocomplete.Status>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/CommandPaletteModal",
};

type Story = StoryObj<typeof baseMeta>;

export const CommandPaletteModal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command-palette style search with grouped commands, modal behavior, backdrop, and arrow.",
      },
    },
    layout: "padded",
  },
  render: () => <CommandPaletteModalDemo />,
};
