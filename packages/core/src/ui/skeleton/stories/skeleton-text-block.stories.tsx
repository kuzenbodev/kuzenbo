import type { StoryObj } from "@storybook/react";

import { TextBlock as TextBlockStory, baseMeta } from "./skeleton-story-shared";

export default {
  ...baseMeta,
  title: "Components/Skeleton/TextBlock",
};
type Story = StoryObj<typeof baseMeta>;

export const TextBlock: Story = TextBlockStory;
