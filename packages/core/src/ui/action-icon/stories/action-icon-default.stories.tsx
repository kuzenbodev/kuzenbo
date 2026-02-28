import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./action-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ActionIcon/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
