import type { StoryObj } from "@storybook/react";

import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

export default {
  ...baseMeta,
  title: "Components/Autocomplete/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const options = ["Option A", "Option B", "Option C"] as const;
const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {sizeOptions.map((size) => (
        <Autocomplete
          defaultValue={options[0]}
          items={options}
          key={size}
          size={size}
        >
          <Autocomplete.Input placeholder={`Search (${size})`} />
          <Autocomplete.Content>
            <Autocomplete.Empty>No options found.</Autocomplete.Empty>
            <Autocomplete.List>
              {(item: string) => (
                <Autocomplete.Item key={item} value={item}>
                  {item}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
      ))}
    </div>
  ),
};
