import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultScenario,
  baseMeta,
} from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
