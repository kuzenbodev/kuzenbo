import type { StoryObj } from "@storybook/react";

import {
  SingleColorSizeRadius as SingleColorSizeRadiusStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/ColorSizeRadius",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleColorSizeRadius: Story = SingleColorSizeRadiusStory;
