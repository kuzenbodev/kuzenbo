import type { StoryObj } from "@storybook/react";

import {
  SingleRestrictToMarks as SingleRestrictToMarksStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/RestrictToMarks",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleRestrictToMarks: Story = SingleRestrictToMarksStory;
