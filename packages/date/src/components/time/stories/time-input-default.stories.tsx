import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./time-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/TimeInput/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
