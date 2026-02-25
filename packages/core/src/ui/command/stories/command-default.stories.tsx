import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./command-story-shared";

export default {
  ...baseMeta,
  title: "Components/Command/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
