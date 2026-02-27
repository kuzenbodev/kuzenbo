import type { StoryObj } from "@storybook/react";

import {
  Constraints as ConstraintsStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/Calendar/Constraints",
};

type Story = StoryObj<typeof baseMeta>;

export const Constraints: Story = ConstraintsStory;
