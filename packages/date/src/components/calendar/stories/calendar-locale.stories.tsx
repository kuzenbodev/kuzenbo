import type { StoryObj } from "@storybook/react";

import { Locale as LocaleStory, baseMeta } from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Calendar/Locale",
};

type Story = StoryObj<typeof baseMeta>;

export const Locale: Story = LocaleStory;
