import type { StoryObj } from "@storybook/react";

import {
  RangeRestrictToMarks as RangeRestrictToMarksStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/RestrictToMarks",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeRestrictToMarks: Story = RangeRestrictToMarksStory;
