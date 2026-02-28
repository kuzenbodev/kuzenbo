import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./mini-calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/MiniCalendar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
