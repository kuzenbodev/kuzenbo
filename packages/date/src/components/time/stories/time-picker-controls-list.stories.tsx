import type { StoryObj } from "@storybook/react";

import {
  ControlsList as ControlsListStory,
  baseMeta,
} from "./time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimePicker/Controls List",
};

type Story = StoryObj<typeof baseMeta>;

export const ControlsList: Story = ControlsListStory;
