import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./pill-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pill/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
