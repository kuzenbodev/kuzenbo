import type { StoryObj } from "@storybook/react";

import { ReadOnly as ReadOnlyScenario, baseMeta } from "./rating-story-shared";

export default {
  ...baseMeta,
  title: "Components/Rating/ReadOnly",
};
type Story = StoryObj<typeof baseMeta>;

export const ReadOnly: Story = ReadOnlyScenario;
