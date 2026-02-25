import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./use-mobile-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsMobile/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
