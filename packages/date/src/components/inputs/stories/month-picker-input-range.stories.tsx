import type { StoryObj } from "@storybook/react";

import {
  Range as RangeStory,
  baseMeta,
} from "./month-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MonthPickerInput/Range",
};

type Story = StoryObj<typeof baseMeta>;

export const Range: Story = RangeStory;
