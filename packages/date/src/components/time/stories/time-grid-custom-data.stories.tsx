import type { StoryObj } from "@storybook/react";

import {
  CustomData as CustomDataStory,
  baseMeta,
} from "./time-grid-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimeGrid/Custom Data",
};

type Story = StoryObj<typeof baseMeta>;

export const CustomData: Story = CustomDataStory;
