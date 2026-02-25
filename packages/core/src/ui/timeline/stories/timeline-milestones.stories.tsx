import type { StoryObj } from "@storybook/react";

import {
  Milestones as MilestonesStory,
  baseMeta,
} from "./timeline-story-shared";

export default {
  ...baseMeta,
  title: "Components/Timeline/Milestones",
};
type Story = StoryObj<typeof baseMeta>;

export const Milestones: Story = MilestonesStory;
