import type { StoryObj } from "@storybook/react";

import {
  DisabledOption as DisabledOptionScenario,
  baseMeta,
} from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/DisabledOption",
};
type Story = StoryObj<typeof baseMeta>;

export const DisabledOption: Story = DisabledOptionScenario;
