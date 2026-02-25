import type { StoryObj } from "@storybook/react";

import {
  VerticalRange as VerticalRangeStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/Vertical",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const VerticalRange: Story = VerticalRangeStory;
