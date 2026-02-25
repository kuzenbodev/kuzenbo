import type { StoryObj } from "@storybook/react";

import {
  Vertical as SeparatorVerticalStory,
  baseMeta,
} from "./separator-story-shared";

export default {
  ...baseMeta,
  title: "Components/Separator/Vertical",
};
type Story = StoryObj<typeof baseMeta>;

export const Vertical: Story = SeparatorVerticalStory;
