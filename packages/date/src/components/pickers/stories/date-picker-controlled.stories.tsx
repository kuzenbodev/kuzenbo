import type { StoryObj } from "@storybook/react";

import {
  ControlledRange as ControlledRangeStory,
  baseMeta,
} from "./date-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/DatePicker/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const ControlledRange: Story = ControlledRangeStory;
