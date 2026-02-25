import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-ai-session-story-shared";

export default {
  ...baseMeta,
  title: "AI/useAiSession/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
