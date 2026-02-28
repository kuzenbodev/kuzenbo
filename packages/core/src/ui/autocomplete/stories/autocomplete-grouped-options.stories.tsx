import type { StoryObj } from "@storybook/react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

interface OptionGroup {
  value: string;
  items: string[];
}

const groupedOptions: OptionGroup[] = [
  { items: ["Apple", "Banana", "Orange"], value: "Fruits" },
  { items: ["Carrot", "Spinach", "Zucchini"], value: "Vegetables" },
];

export default {
  ...baseMeta,
  title: "Components/Autocomplete/GroupedOptions",
};

type Story = StoryObj<typeof baseMeta>;

export const GroupedOptions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grouped options rendered with Group, GroupLabel, and Collection.",
      },
    },
  },
  render: () => (
    <Autocomplete defaultValue="Apple" items={groupedOptions}>
      <Autocomplete.Input placeholder="Search produce..." />
      <Autocomplete.Content>
        <Autocomplete.Empty>No options found.</Autocomplete.Empty>
        <Autocomplete.List>
          {(group: OptionGroup) => (
            <Autocomplete.Group key={group.value} items={group.items}>
              <Autocomplete.GroupLabel>{group.value}</Autocomplete.GroupLabel>
              <Autocomplete.Collection>
                {(item: string) => (
                  <Autocomplete.Item
                    key={`${group.value}-${item}`}
                    value={item}
                  >
                    {item}
                  </Autocomplete.Item>
                )}
              </Autocomplete.Collection>
            </Autocomplete.Group>
          )}
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  ),
};
