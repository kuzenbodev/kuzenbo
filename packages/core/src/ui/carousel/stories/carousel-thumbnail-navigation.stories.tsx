import type { StoryObj } from "@storybook/react";

import {
  ThumbnailNavigation as ThumbnailNavigationStory,
  baseMeta,
} from "./carousel-story-shared";

export default {
  ...baseMeta,
  title: "Components/Carousel/ThumbnailNavigation",
};
type Story = StoryObj<typeof baseMeta>;

export const ThumbnailNavigation: Story = ThumbnailNavigationStory;
