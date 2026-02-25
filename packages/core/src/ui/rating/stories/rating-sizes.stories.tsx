import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./rating-story-shared";

export default {
  ...baseMeta,
  title: "Components/Rating/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
