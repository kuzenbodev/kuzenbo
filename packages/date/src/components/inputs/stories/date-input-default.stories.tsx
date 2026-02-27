import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./date-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DateInput/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
