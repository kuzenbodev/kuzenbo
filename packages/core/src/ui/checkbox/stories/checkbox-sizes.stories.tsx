import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
