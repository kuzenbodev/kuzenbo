import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./carousel-story-shared";

export default {
  ...baseMeta,
  title: "Components/Carousel/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
