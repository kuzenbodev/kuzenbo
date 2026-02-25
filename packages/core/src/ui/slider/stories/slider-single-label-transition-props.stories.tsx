import type { StoryObj } from "@storybook/react";

import {
  SingleLabelTransitionProps as SingleLabelTransitionPropsStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/LabelTransitionProps",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleLabelTransitionProps: Story =
  SingleLabelTransitionPropsStory;
