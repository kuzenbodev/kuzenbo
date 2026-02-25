import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./theme-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ThemeIcon/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
