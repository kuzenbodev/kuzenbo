import type { StoryObj } from "@storybook/react";

import {
  VerticalRangeMarks as VerticalRangeMarksStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/Vertical/Marks",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const VerticalRangeMarks: Story = VerticalRangeMarksStory;
