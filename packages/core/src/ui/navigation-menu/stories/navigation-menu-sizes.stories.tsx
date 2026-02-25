import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./navigation-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationMenu/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
