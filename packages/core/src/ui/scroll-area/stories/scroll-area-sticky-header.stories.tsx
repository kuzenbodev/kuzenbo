import type { StoryObj } from "@storybook/react";

import {
  StickyHeader as StickyHeaderStory,
  baseMeta,
} from "./scroll-area-story-shared";

export default {
  ...baseMeta,
  title: "Components/ScrollArea/StickyHeader",
};
type Story = StoryObj<typeof baseMeta>;

export const StickyHeader: Story = StickyHeaderStory;
