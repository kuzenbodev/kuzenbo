import type { StoryObj } from "@storybook/react";

import {
  Range as RangeStory,
  baseMeta,
} from "./date-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/DatePickerInput/Range",
};

type Story = StoryObj<typeof baseMeta>;

export const Range: Story = RangeStory;
