import type { StoryObj } from "@storybook/react";

import {
  ControlledRange as ControlledRangeStory,
  baseMeta,
} from "./month-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MonthPicker/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const ControlledRange: Story = ControlledRangeStory;
