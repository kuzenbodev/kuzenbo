import type { StoryObj } from "@storybook/react";

import {
  CardLayout as CardLayoutStory,
  baseMeta,
} from "./skeleton-story-shared";

export default {
  ...baseMeta,
  title: "Components/Skeleton/CardLayout",
};
type Story = StoryObj<typeof baseMeta>;

export const CardLayout: Story = CardLayoutStory;
