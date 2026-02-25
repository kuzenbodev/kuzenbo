import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./timeline-story-shared";

export default {
  ...baseMeta,
  title: "Components/Timeline/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
