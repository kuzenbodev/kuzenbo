import type { StoryObj } from "@storybook/react";

import { Select } from "../select";
import { baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/Composed Subprimitives",
};

type Story = StoryObj<typeof baseMeta>;

export const ComposedSubprimitives: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="min-w-56">
        <Select.Value placeholder="Choose an environment" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.Arrow />
            <Select.ScrollUpArrow />
            <Select.List>
              <Select.Group>
                <Select.GroupLabel>Environment</Select.GroupLabel>
                <Select.Item value="development">
                  <Select.ItemText>Development</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="staging">
                  <Select.ItemText>Staging</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
                <Select.Separator />
                <Select.Item value="production">
                  <Select.ItemText>Production</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              </Select.Group>
            </Select.List>
            <Select.ScrollDownArrow />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  ),
};
