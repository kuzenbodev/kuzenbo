import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./time-value-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimeValue/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
