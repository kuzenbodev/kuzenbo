import type { StoryObj } from "@storybook/react";

import {
  VerticalRangeRestrictToMarks as VerticalRangeRestrictToMarksStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/Vertical/RestrictToMarks",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const VerticalRangeRestrictToMarks: Story =
  VerticalRangeRestrictToMarksStory;
