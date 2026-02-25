import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./tooltip-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tooltip/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
