import type { StoryObj } from "@storybook/react";

import {
  SingleSelect as SingleSelectScenario,
  baseMeta,
} from "./toggle-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ToggleGroup/SingleSelect",
};
type Story = StoryObj<typeof baseMeta>;

export const SingleSelect: Story = SingleSelectScenario;
