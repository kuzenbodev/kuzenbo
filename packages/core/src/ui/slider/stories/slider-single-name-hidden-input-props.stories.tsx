import type { StoryObj } from "@storybook/react";

import {
  SingleNameAndHiddenInputProps as SingleNameAndHiddenInputPropsStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/NameAndHiddenInputProps",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleNameAndHiddenInputProps: Story =
  SingleNameAndHiddenInputPropsStory;
