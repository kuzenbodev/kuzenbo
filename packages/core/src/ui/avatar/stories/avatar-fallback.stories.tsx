import type { StoryObj } from "@storybook/react";

import { Fallback as FallbackStory, baseMeta } from "./avatar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Avatar/Fallback",
};
type Story = StoryObj<typeof baseMeta>;

export const Fallback: Story = FallbackStory;
