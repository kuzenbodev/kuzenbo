import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultScenario,
  baseMeta,
} from "./checkbox-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/CheckboxGroup/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
