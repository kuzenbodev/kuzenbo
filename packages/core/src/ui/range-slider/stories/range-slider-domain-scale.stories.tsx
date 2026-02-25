import type { StoryObj } from "@storybook/react";

import {
  RangeDomainScale as RangeDomainScaleStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/DomainScale",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeDomainScale: Story = RangeDomainScaleStory;
