import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./progress-story-shared";

export default {
  ...baseMeta,
  title: "Components/Progress/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
