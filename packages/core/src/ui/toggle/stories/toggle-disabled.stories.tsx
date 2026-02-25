import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledScenario, baseMeta } from "./toggle-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toggle/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledScenario;
