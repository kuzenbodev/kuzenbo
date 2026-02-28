import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./month-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/MonthPicker/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
