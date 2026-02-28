import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Select } from "../select";
import { baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/DisabledOptions",
};
type Story = StoryObj<typeof baseMeta>;

const DisabledOptionsDemo = () => {
  const [selectedTeam, setSelectedTeam] = useState("design");
  const handleValueChange = useCallback((value: string | null) => {
    setSelectedTeam(value ?? "No team selected");
  }, []);

  return (
    <div className="w-72 space-y-2">
      <Select defaultValue={selectedTeam} onValueChange={handleValueChange}>
        <Select.Trigger className="min-w-56">
          <Select.Value placeholder="Assign owner team" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Available teams</Select.Label>
            <Select.Item value="design">Design</Select.Item>
            <Select.Item value="engineering">Engineering</Select.Item>
            <Select.Item value="support">Support</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Restricted teams</Select.Label>
            <Select.Item disabled value="finance">
              Finance (permission required)
            </Select.Item>
            <Select.Item disabled value="security">
              Security (admin only)
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
      <div className="text-muted-foreground text-sm">
        Assigned owner team: {selectedTeam}
      </div>
    </div>
  );
};

export const DisabledOptions: Story = {
  render: () => <DisabledOptionsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows selectable and disabled options in one menu, useful for permission-gated choices.",
      },
    },
  },
};
