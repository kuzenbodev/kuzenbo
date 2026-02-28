import type { StoryObj } from "@storybook/react";

import {
  ControlledRange as ControlledRangeStory,
  baseMeta,
} from "./year-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/YearPicker/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const ControlledRange: Story = ControlledRangeStory;
