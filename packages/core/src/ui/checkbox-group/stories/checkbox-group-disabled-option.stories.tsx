import type { StoryObj } from "@storybook/react";

import {
  DisabledOption as DisabledOptionScenario,
  baseMeta,
} from "./checkbox-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/CheckboxGroup/DisabledOption",
};
type Story = StoryObj<typeof baseMeta>;

export const DisabledOption: Story = DisabledOptionScenario;
