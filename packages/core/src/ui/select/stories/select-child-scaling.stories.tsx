import type { StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { Select } from "../select";
import { baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/ChildScaling",
};

type Story = StoryObj<typeof baseMeta>;

const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const ChildScaling: Story = {
  render: () => (
    <div className="grid w-[30rem] gap-4">
      {sizes.map((size) => (
        <div className="space-y-2" key={size}>
          <p className="text-muted-foreground text-sm uppercase">{size}</p>
          <Select defaultValue="a" open size={size}>
            <Select.Trigger className="min-w-52">
              <Select.Value placeholder="Select option" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="a">Option A</Select.Item>
                <Select.Item value="b">Option B</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Trigger, popup, labels, rows, and indicators scale together using the same size token.",
      },
    },
  },
};
