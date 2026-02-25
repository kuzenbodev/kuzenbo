import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultScenario,
  baseMeta,
} from "./toggle-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ToggleGroup/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
