import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./card-story-shared";

export default {
  ...baseMeta,
  title: "Components/Card/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
