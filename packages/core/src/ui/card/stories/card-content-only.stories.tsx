import type { StoryObj } from "@storybook/react";

import { ContentOnly as ContentOnlyStory, baseMeta } from "./card-story-shared";

export default {
  ...baseMeta,
  title: "Components/Card/ContentOnly",
};
type Story = StoryObj<typeof baseMeta>;

export const ContentOnly: Story = ContentOnlyStory;
