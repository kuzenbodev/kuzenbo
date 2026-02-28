import type { StoryObj } from "@storybook/react";

import {
  Constraints as ConstraintsStory,
  baseMeta,
} from "./time-grid-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimeGrid/Constraints",
};

type Story = StoryObj<typeof baseMeta>;

export const Constraints: Story = ConstraintsStory;
