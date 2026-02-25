import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./popover-story-shared";

export default {
  ...baseMeta,
  title: "Components/Popover/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
