import type { StoryObj } from "@storybook/react";

import {
  Controlled as ControlledStory,
  baseMeta,
} from "./mini-calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/MiniCalendar/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const Controlled: Story = ControlledStory;
