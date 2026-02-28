import type { StoryObj } from "@storybook/react";

import { Combobox } from "../combobox";
import { baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/Composed Subprimitives",
};

type Story = StoryObj<typeof baseMeta>;

interface WorkspaceSetting {
  label: string;
  value: string;
}

const workspaceSettings: WorkspaceSetting[] = [
  { label: "API keys", value: "api" },
  { label: "Billing", value: "billing" },
  { label: "Teams", value: "teams" },
];

const settingToLabel = (item: WorkspaceSetting) => item.label;
const settingToValue = (item: WorkspaceSetting) => item.value;

export const ComposedSubprimitives: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full popup anatomy using composed subprimitives: Portal, Positioner, Popup, Arrow, Status, List, Group, and Collection.",
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Combobox
        defaultValue={workspaceSettings[0]}
        itemToStringLabel={settingToLabel}
        itemToStringValue={settingToValue}
        items={workspaceSettings}
      >
        <Combobox.Input
          aria-label="Workspace setting"
          placeholder="Select workspace setting"
        />
        <Combobox.Portal>
          <Combobox.Positioner sideOffset={8}>
            <Combobox.Popup>
              <Combobox.Arrow />
              <Combobox.Empty>No workspace settings found.</Combobox.Empty>
              <Combobox.List>
                <Combobox.Group>
                  <Combobox.GroupLabel>Workspace settings</Combobox.GroupLabel>
                  <Combobox.Collection>
                    {(item: WorkspaceSetting) => (
                      <Combobox.Row key={item.value}>
                        <Combobox.Item value={item}>{item.label}</Combobox.Item>
                      </Combobox.Row>
                    )}
                  </Combobox.Collection>
                </Combobox.Group>
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    </div>
  ),
};
