import type { StoryObj } from "@storybook/react";

import {
  Controlled as ControlledStory,
  baseMeta,
} from "./mini-calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MiniCalendar/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const Controlled: Story = ControlledStory;
