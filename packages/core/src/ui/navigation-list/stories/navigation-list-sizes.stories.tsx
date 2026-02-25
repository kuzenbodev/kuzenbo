import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
