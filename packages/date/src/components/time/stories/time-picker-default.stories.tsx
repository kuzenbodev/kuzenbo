import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./time-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimePicker/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
