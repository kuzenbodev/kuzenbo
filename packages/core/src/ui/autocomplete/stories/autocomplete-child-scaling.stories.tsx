import type { StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { Autocomplete } from "../autocomplete";
import { baseMeta } from "./autocomplete-story-shared";

export default {
  ...baseMeta,
  title: "Components/Autocomplete/ChildScaling",
};

type Story = StoryObj<typeof baseMeta>;

const options = ["Option A", "Option B", "Option C"] as const;
const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const ChildScaling: Story = {
  render: () => (
    <div className="grid w-[30rem] gap-4">
      {sizes.map((size) => (
        <div className="space-y-2" key={size}>
          <p className="text-muted-foreground text-sm uppercase">{size}</p>
          <Autocomplete
            defaultValue="Option A"
            items={options}
            open
            size={size}
          >
            <Autocomplete.Input placeholder="Search options..." />
            <Autocomplete.Content>
              <Autocomplete.Empty>No options found.</Autocomplete.Empty>
              <Autocomplete.List>
                <Autocomplete.Row>
                  {options.map((item) => (
                    <Autocomplete.Item key={item} value={item}>
                      {item}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Row>
              </Autocomplete.List>
              <Autocomplete.Status>3 suggestion(s)</Autocomplete.Status>
            </Autocomplete.Content>
          </Autocomplete>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Input, popup, rows, items, labels, status, and empty state all scale with the same size token.",
      },
    },
  },
};
