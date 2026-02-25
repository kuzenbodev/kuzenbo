import type { StoryObj } from "@storybook/react";

import { Sizes as SizesStory, baseMeta } from "./alert-dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/AlertDialog/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizesStory;
