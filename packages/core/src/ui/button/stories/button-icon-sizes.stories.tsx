import type { StoryObj } from "@storybook/react";

import {
  baseMeta,
  IconSizesMatrix as IconSizesMatrixStory,
} from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/IconSizes",
};
type Story = StoryObj<typeof baseMeta>;

export const IconSizesMatrix: Story = IconSizesMatrixStory;
