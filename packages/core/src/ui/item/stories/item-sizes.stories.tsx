import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./item-story-shared";

export default {
  ...baseMeta,
  title: "Components/Item/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
