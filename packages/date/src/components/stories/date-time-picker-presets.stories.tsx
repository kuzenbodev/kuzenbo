import type { StoryObj } from "@storybook/react";

import {
  Presets as PresetsStory,
  baseMeta,
} from "./date-time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/DateTimePicker/Presets",
};

type Story = StoryObj<typeof baseMeta>;

export const Presets: Story = PresetsStory;
