import type { StoryObj } from "@storybook/react";

import {
  RecentlyUsed as RecentlyUsedStory,
  baseMeta,
} from "./emoji-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/EmojiPicker/RecentlyUsed",
};
type Story = StoryObj<typeof baseMeta>;

export const RecentlyUsed: Story = RecentlyUsedStory;
