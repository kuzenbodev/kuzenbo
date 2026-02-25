import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
