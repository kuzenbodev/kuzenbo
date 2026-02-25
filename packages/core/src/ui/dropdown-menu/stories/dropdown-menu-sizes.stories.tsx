import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./dropdown-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/DropdownMenu/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
