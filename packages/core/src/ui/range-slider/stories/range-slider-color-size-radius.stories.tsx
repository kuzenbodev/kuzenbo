import type { StoryObj } from "@storybook/react";

import {
  RangeColorSizeRadius as RangeColorSizeRadiusStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/ColorSizeRadius",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeColorSizeRadius: Story = RangeColorSizeRadiusStory;
