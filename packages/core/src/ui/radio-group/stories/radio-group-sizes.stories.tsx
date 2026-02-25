import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
