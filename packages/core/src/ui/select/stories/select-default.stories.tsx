import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./select-story-shared";

export default {
  ...baseMeta,
  title: "Components/Select/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
