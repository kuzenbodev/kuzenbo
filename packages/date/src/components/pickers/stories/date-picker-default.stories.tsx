import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./date-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/DatePicker/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
