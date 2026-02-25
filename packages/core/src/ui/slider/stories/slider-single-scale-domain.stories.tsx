import type { StoryObj } from "@storybook/react";

import {
  SingleScaleDomain as SingleScaleDomainStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/ScaleDomain",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleScaleDomain: Story = SingleScaleDomainStory;
