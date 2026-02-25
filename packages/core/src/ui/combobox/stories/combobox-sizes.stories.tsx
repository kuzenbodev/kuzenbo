import type { StoryObj } from "@storybook/react";

import { Combobox } from "../combobox";
import { baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const frameworkItems = ["React", "Vue", "Svelte", "Solid", "Angular"] as const;
const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {sizeOptions.map((size) => (
        <Combobox
          defaultValue={frameworkItems[0]}
          items={frameworkItems}
          key={size}
          size={size}
        >
          <Combobox.Input
            aria-label={`Framework (${size})`}
            placeholder={`Search frameworks (${size})`}
            showClear
          />
          <Combobox.Content>
            <Combobox.Empty>No framework found.</Combobox.Empty>
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
      ))}
    </div>
  ),
};
