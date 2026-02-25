import type { StoryObj } from "@storybook/react";

import {
  VerticalSingleMarks as VerticalSingleMarksStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Vertical/Marks",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const VerticalSingleMarks: Story = VerticalSingleMarksStory;
