import type { StoryObj } from "@storybook/react";

import {
  TimezoneDst as TimezoneDstStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/Calendar/Timezone DST",
};

type Story = StoryObj<typeof baseMeta>;

export const TimezoneDst: Story = TimezoneDstStory;
