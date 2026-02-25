import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  rangeBaseMeta,
} from "./range-slider-story-shared";

export default {
  ...rangeBaseMeta,
  title: "Components/RangeSlider/Default",
};

type Story = StoryObj<typeof rangeBaseMeta>;

export const Default: Story = DefaultStory;
