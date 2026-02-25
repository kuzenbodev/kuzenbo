import type { StoryObj } from "@storybook/react";

import {
  RangePushOnOverlapOff as RangePushOnOverlapOffStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/PushOnOverlapOff",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangePushOnOverlapOff: Story = RangePushOnOverlapOffStory;
