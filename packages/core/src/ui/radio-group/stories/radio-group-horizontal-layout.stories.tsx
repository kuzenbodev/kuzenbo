import type { StoryObj } from "@storybook/react";

import {
  HorizontalLayout as HorizontalLayoutScenario,
  baseMeta,
} from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/HorizontalLayout",
};
type Story = StoryObj<typeof baseMeta>;

export const HorizontalLayout: Story = HorizontalLayoutScenario;
