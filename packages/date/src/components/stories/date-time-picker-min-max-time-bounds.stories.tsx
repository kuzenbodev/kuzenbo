import type { StoryObj } from "@storybook/react";

import {
  MinMaxTimeBounds as MinMaxTimeBoundsStory,
  baseMeta,
} from "./date-time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DateTimePicker/Min Max Time Bounds",
};

type Story = StoryObj<typeof baseMeta>;

export const MinMaxTimeBounds: Story = MinMaxTimeBoundsStory;
