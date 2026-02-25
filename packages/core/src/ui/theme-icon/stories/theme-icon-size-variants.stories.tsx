import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./theme-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ThemeIcon/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
