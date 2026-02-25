import type { StoryObj } from "@storybook/react";

import {
  HorizontalContent as HorizontalContentStory,
  baseMeta,
} from "./scroll-area-story-shared";

export default {
  ...baseMeta,
  title: "Components/ScrollArea/HorizontalContent",
};
type Story = StoryObj<typeof baseMeta>;

export const HorizontalContent: Story = HorizontalContentStory;
