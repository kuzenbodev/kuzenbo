import type { StoryObj } from "@storybook/react";

import { Sides as SidesStory, baseMeta } from "./tooltip-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tooltip/Sides",
};
type Story = StoryObj<typeof baseMeta>;

export const Sides: Story = SidesStory;
