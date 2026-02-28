import type { StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { Combobox } from "../combobox";
import { baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/ChildScaling",
};

type Story = StoryObj<typeof baseMeta>;

const frameworkItems = ["React", "Vue", "Svelte", "Solid", "Angular"] as const;
const sizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const ChildScaling: Story = {
  render: () => (
    <div className="grid w-[30rem] gap-4">
      {sizes.map((size) => (
        <div className="space-y-2" key={size}>
          <p className="text-muted-foreground text-sm uppercase">{size}</p>
          <Combobox
            defaultValue={frameworkItems[0]}
            items={frameworkItems}
            open
            size={size}
          >
            <Combobox.Input placeholder="Search frameworks..." showClear />
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
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Input and all popup child surfaces scale together, avoiding mismatched trigger-vs-dropdown density.",
      },
    },
  },
};
