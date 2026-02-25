import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./menubar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Menubar/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
