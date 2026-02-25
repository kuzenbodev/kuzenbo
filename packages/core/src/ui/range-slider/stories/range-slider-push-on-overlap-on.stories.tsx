import type { StoryObj } from "@storybook/react";

import {
  RangePushOnOverlapOn as RangePushOnOverlapOnStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/PushOnOverlapOn",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangePushOnOverlapOn: Story = RangePushOnOverlapOnStory;
