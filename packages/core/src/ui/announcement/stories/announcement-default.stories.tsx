import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./announcement-story-shared";

export default {
  ...baseMeta,
  title: "Components/Announcement/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
