import type { StoryObj } from "@storybook/react";

import { Default as CodeDefaultStory, baseMeta } from "./code-story-shared";

export default {
  ...baseMeta,
  title: "Components/Code/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = CodeDefaultStory;
