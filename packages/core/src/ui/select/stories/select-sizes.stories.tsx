import type { StoryObj } from "@storybook/react";

import { Select } from "../select";
import { baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {sizeOptions.map((size) => (
        <Select key={size} size={size}>
          <Select.Trigger>
            <Select.Value placeholder={`Select (${size})`} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="a">Option A</Select.Item>
            <Select.Item value="b">Option B</Select.Item>
          </Select.Content>
        </Select>
      ))}
    </div>
  ),
};
