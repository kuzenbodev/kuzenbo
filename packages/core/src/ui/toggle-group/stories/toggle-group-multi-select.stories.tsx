import type { StoryObj } from "@storybook/react";

import {
  MultiSelect as MultiSelectScenario,
  baseMeta,
} from "./toggle-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ToggleGroup/MultiSelect",
};
type Story = StoryObj<typeof baseMeta>;

export const MultiSelect: Story = MultiSelectScenario;
