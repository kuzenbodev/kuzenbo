import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./spinner-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spinner/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
