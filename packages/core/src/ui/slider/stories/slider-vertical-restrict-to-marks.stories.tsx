import type { StoryObj } from "@storybook/react";

import {
  VerticalSingleRestrictToMarks as VerticalSingleRestrictToMarksStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Vertical/RestrictToMarks",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const VerticalSingleRestrictToMarks: Story =
  VerticalSingleRestrictToMarksStory;
