import type { StoryObj } from "@storybook/react";

import {
  RangeMinMaxRange as RangeMinMaxRangeStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/MinMaxRange",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeMinMaxRange: Story = RangeMinMaxRangeStory;
