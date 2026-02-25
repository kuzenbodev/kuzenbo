import type { StoryObj } from "@storybook/react";

import { WithIcon as WithIconScenario, baseMeta } from "./toggle-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toggle/WithIcon",
};
type Story = StoryObj<typeof baseMeta>;

export const WithIcon: Story = WithIconScenario;
