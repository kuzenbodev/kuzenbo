import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface WorkspaceOption {
  value: string;
  label: string;
  plan: "Starter" | "Pro" | "Enterprise";
}

const workspaces: WorkspaceOption[] = [
  { label: "Ops HQ", plan: "Enterprise", value: "ops-hq" },
  { label: "Growth Lab", plan: "Pro", value: "growth-lab" },
  { label: "Customer Success", plan: "Pro", value: "customer-success" },
  { label: "Sandbox", plan: "Starter", value: "sandbox" },
  { label: "QA Staging", plan: "Starter", value: "qa-staging" },
];

const workspaceToValue = (itemValue: unknown) =>
  (itemValue as WorkspaceOption).value;

const WorkspaceSwitcherDemo = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    "No workspace selected"
  );

  const handleValueChange = useCallback((value: string) => {
    setSelectedWorkspace(value);
  }, []);

  return (
    <div className="w-[24rem] space-y-2">
      <Autocomplete
        itemToStringValue={workspaceToValue}
        items={workspaces}
        name="workspace"
        onValueChange={handleValueChange}
        openOnInputClick
        required
      >
        <Autocomplete.Input placeholder="Switch workspace..." />
        <Autocomplete.Content>
          <Autocomplete.Empty>No workspace matches.</Autocomplete.Empty>
          <Autocomplete.List>
            {(workspace: WorkspaceOption) => (
              <Autocomplete.Item key={workspace.value} value={workspace}>
                <div className="flex w-full items-center justify-between gap-3">
                  <span>{workspace.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {workspace.plan}
                  </span>
                </div>
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
      <p className="text-muted-foreground text-sm">
        Current workspace value: {selectedWorkspace}
      </p>
    </div>
  );
};

export default {
  ...baseMeta,
  title: "Components/Autocomplete/WorkspaceSwitcher",
};

type Story = StoryObj<typeof baseMeta>;

export const WorkspaceSwitcher: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Workspace switcher with object values, custom form value serialization, and required form participation.",
      },
    },
  },
  render: () => <WorkspaceSwitcherDemo />,
};
