import type { StoryObj } from "@storybook/react";

import {
  Range as RangeStory,
  baseMeta,
} from "./year-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/YearPickerInput/Range",
};

type Story = StoryObj<typeof baseMeta>;

export const Range: Story = RangeStory;
