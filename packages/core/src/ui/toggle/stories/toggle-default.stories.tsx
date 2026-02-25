import type { StoryObj } from "@storybook/react";

import { Default as DefaultScenario, baseMeta } from "./toggle-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toggle/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
