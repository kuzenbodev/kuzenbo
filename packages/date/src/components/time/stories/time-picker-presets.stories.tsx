import type { StoryObj } from "@storybook/react";

import { Presets as PresetsStory, baseMeta } from "./time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimePicker/Presets",
};

type Story = StoryObj<typeof baseMeta>;

export const Presets: Story = PresetsStory;
