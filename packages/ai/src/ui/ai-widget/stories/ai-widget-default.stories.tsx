import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./ai-widget-story-shared";

export default {
  ...baseMeta,
  title: "AI/AiWidget/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
