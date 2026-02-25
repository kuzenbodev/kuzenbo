import type { StoryObj } from "@storybook/react";

import { SizeScale as SizeScaleStory, baseMeta } from "./tooltip-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tooltip/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizeScaleStory;
