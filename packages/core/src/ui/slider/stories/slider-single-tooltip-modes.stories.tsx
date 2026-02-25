import type { StoryObj } from "@storybook/react";

import {
  SingleTooltipModes as SingleTooltipModesStory,
  singleBaseMeta,
} from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/TooltipModes",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const SingleTooltipModes: Story = SingleTooltipModesStory;
