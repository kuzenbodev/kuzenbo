import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./mini-calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MiniCalendar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
