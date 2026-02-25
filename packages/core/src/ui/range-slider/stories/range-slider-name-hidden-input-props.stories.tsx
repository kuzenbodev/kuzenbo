import type { StoryObj } from "@storybook/react";

import {
  RangeNameAndHiddenInputProps as RangeNameAndHiddenInputPropsStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/NameAndHiddenInputProps",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const RangeNameAndHiddenInputProps: Story =
  RangeNameAndHiddenInputPropsStory;
