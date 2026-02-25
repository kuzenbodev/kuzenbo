import type { StoryObj } from "@storybook/react";

import {
  RangeEndpointAlignment as RangeEndpointAlignmentStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/EndpointAlignment",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeEndpointAlignment: Story = RangeEndpointAlignmentStory;
