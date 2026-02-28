import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "../combobox";

const frameworkItems = ["React", "Vue", "Svelte", "Solid", "Angular"] as const;

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          "Combobox size cascades across input/chips and popup internals (list, item, labels, status, empty, indicators).",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Combobox",
} satisfies Meta<typeof Combobox>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Combobox defaultValue={frameworkItems[0]} items={frameworkItems}>
        <Combobox.Input
          aria-label="Framework"
          placeholder="Search frameworks..."
          showClear
        />
        <Combobox.Content>
          <Combobox.Empty>No framework found.</Combobox.Empty>
          <Combobox.Status>5 frameworks available</Combobox.Status>
          <Combobox.List>
            <Combobox.Collection>
              {(item: (typeof frameworkItems)[number]) => (
                <Combobox.Row key={item}>
                  <Combobox.Item value={item}>{item}</Combobox.Item>
                </Combobox.Row>
              )}
            </Combobox.Collection>
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    </div>
  ),
};
