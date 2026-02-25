import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./scroll-area-story-shared";

export default {
  ...baseMeta,
  title: "Components/ScrollArea/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
