import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./toggle-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toggle/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
