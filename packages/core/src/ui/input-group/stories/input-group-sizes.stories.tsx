import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
