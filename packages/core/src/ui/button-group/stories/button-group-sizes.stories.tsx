import type { StoryObj } from "@storybook/react";

import {
  SizeMatrix as SizeMatrixStory,
  baseMeta,
} from "./button-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ButtonGroup/Sizes",
};
type Story = StoryObj<typeof baseMeta>;

export const Sizes: Story = SizeMatrixStory;
