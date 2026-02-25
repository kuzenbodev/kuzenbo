import type { StoryObj } from "@storybook/react";

import { Square as SquareStory, baseMeta } from "./aspect-ratio-story-shared";

export default {
  ...baseMeta,
  title: "Components/AspectRatio/Square",
};
type Story = StoryObj<typeof baseMeta>;

export const Square: Story = SquareStory;
