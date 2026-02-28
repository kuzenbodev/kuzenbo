import type { StoryObj } from "@storybook/react";

import {
  WeekNumbers as WeekNumbersStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Calendar/Week Numbers",
};

type Story = StoryObj<typeof baseMeta>;

export const WeekNumbers: Story = WeekNumbersStory;
