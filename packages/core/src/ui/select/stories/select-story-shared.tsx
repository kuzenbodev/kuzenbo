import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "../select";

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          "Select uses one size contract for trigger and popup child surfaces. Content and child slots can override root size when needed.",
      },
    },
  },
  tags: ["autodocs"],
  title: "Components/Select",
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger className="min-w-48">
        <Select.Value placeholder="Select option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Settings</Select.Label>
          <Select.Item value="c">Option C</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};
