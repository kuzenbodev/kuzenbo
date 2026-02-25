import type { StoryObj } from "@storybook/react";

import { Autoplay as AutoplayStory, baseMeta } from "./carousel-story-shared";

export default {
  ...baseMeta,
  title: "Components/Carousel/Autoplay",
};
type Story = StoryObj<typeof baseMeta>;

export const Autoplay: Story = AutoplayStory;
