import type { StoryObj } from "@storybook/react";

import { Ghost as GhostStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Ghost",
};
type Story = StoryObj<typeof baseMeta>;

export const Ghost: Story = GhostStory;
