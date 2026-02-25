import type { StoryObj } from "@storybook/react";

import {
  WithDescription as WithDescriptionScenario,
  baseMeta,
} from "./checkbox-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/CheckboxGroup/WithDescription",
};
type Story = StoryObj<typeof baseMeta>;

export const WithDescription: Story = WithDescriptionScenario;
