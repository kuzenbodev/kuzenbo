import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./year-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/YearPicker/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
