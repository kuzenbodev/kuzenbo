import type { StoryObj } from "@storybook/react";

import { Rtl as RtlStory, baseMeta } from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/Calendar/RTL",
};

type Story = StoryObj<typeof baseMeta>;

export const Rtl: Story = RtlStory;
