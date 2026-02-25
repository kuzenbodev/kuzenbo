import type { StoryObj } from "@storybook/react";

import {
  RangeLabelTransitionProps as RangeLabelTransitionPropsStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/LabelTransitionProps",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeLabelTransitionProps: Story = RangeLabelTransitionPropsStory;
