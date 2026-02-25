import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
