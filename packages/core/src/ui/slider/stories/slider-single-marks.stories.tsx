import type { StoryObj } from "@storybook/react";

import {
  SingleMarks as SingleMarksStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/Marks",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleMarks: Story = SingleMarksStory;
