import type { StoryObj } from "@storybook/react";

import {
  TwelveHourClearable as TwelveHourClearableStory,
  baseMeta,
} from "./time-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimeInput/12h Clearable",
};

type Story = StoryObj<typeof baseMeta>;

export const TwelveHourClearable: Story = TwelveHourClearableStory;
