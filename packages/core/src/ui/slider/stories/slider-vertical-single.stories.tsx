import type { StoryObj } from "@storybook/react";

import {
  VerticalSingle as VerticalSingleStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Vertical/Single",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const VerticalSingle: Story = VerticalSingleStory;
