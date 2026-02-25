import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, singleBaseMeta } from "./slider-story-shared";

export default {
  ...singleBaseMeta,
  title: "Components/Slider/Single/Default",
};

type Story = StoryObj<typeof singleBaseMeta>;

export const Default: Story = DefaultStory;
