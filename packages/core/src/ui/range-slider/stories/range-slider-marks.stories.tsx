import type { StoryObj } from "@storybook/react";

import {
  RangeMarks as RangeMarksStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/Marks",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeMarks: Story = RangeMarksStory;
