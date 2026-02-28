import type { StoryObj } from "@storybook/react";

import {
  LocaleRuntimeSwitching as LocaleRuntimeSwitchingStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Calendar/Locale Runtime Switching",
};

type Story = StoryObj<typeof baseMeta>;

export const LocaleRuntimeSwitching: Story = LocaleRuntimeSwitchingStory;
