import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./avatar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Avatar/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
