import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
