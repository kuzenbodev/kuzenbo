import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./emoji-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/EmojiPicker/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
