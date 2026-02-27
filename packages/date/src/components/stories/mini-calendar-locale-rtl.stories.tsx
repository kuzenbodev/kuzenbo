import type { StoryObj } from "@storybook/react";

import {
  LocaleRtl as LocaleRtlStory,
  baseMeta,
} from "./mini-calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MiniCalendar/Locale RTL",
};

type Story = StoryObj<typeof baseMeta>;

export const LocaleRtl: Story = LocaleRtlStory;
