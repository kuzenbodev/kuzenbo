import type { StoryObj } from "@storybook/react";

import {
  SizesMatrix as SizesMatrixStory,
  baseMeta,
} from "./action-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ActionIcon/SizeMatrix",
};
type Story = StoryObj<typeof baseMeta>;

export const SizesMatrix: Story = SizesMatrixStory;
