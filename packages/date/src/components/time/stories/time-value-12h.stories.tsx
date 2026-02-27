import type { StoryObj } from "@storybook/react";

import {
  TwelveHour as TwelveHourStory,
  baseMeta,
} from "./time-value-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimeValue/12h",
};

type Story = StoryObj<typeof baseMeta>;

export const TwelveHour: Story = TwelveHourStory;
