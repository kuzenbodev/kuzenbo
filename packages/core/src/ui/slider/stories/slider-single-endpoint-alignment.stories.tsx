import type { StoryObj } from "@storybook/react";

import {
  SingleEndpointAlignment as SingleEndpointAlignmentStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/EndpointAlignment",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleEndpointAlignment: Story = SingleEndpointAlignmentStory;
