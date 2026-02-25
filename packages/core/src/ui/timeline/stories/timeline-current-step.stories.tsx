import type { StoryObj } from "@storybook/react";

import {
  CurrentStep as CurrentStepStory,
  baseMeta,
} from "./timeline-story-shared";

export default {
  ...baseMeta,
  title: "Components/Timeline/CurrentStep",
};
type Story = StoryObj<typeof baseMeta>;

export const CurrentStep: Story = CurrentStepStory;
