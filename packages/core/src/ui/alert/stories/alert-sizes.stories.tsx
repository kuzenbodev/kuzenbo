import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
