import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete } from "../autocomplete";

const options = ["Option A", "Option B", "Option C"] as const;

export const baseMeta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Autocomplete uses a shared size contract across input and popup child surfaces. Content and child slots can override root size.",
      },
    },
  },
} satisfies Meta<typeof Autocomplete>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Autocomplete defaultValue="Option A" items={options}>
      <Autocomplete.Input placeholder="Search options..." />
      <Autocomplete.Content>
        <Autocomplete.Empty>No options found.</Autocomplete.Empty>
        <Autocomplete.List>
          <Autocomplete.Row>
            <Autocomplete.Group>
              <Autocomplete.GroupLabel>Suggestions</Autocomplete.GroupLabel>
              {options.map((item) => (
                <Autocomplete.Item key={item} value={item}>
                  {item}
                </Autocomplete.Item>
              ))}
            </Autocomplete.Group>
          </Autocomplete.Row>
        </Autocomplete.List>
        <Autocomplete.Status>3 suggestion(s)</Autocomplete.Status>
      </Autocomplete.Content>
    </Autocomplete>
  ),
};
