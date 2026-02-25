import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./context-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/ContextMenu/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
