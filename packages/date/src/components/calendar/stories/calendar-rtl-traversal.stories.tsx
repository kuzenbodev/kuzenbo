import type { StoryObj } from "@storybook/react";

import {
  RtlTraversal as RtlTraversalStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Calendar/RTL Traversal",
};

type Story = StoryObj<typeof baseMeta>;

export const RtlTraversal: Story = RtlTraversalStory;
