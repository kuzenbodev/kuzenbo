import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./skeleton-story-shared";

export default {
  ...baseMeta,
  title: "Components/Skeleton/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
