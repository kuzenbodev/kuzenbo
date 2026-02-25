import type { StoryObj } from "@storybook/react";

import { Default as DefaultScenario, baseMeta } from "./rating-story-shared";

export default {
  ...baseMeta,
  title: "Components/Rating/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
