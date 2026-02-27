import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/Calendar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
