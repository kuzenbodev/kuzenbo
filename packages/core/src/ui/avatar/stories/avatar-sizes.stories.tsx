import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./avatar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Avatar/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
