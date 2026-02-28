import type { StoryObj } from "@storybook/react";

import {
  Controlled as ControlledStory,
  baseMeta,
} from "./date-time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/DateTimePicker/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const Controlled: Story = ControlledStory;
