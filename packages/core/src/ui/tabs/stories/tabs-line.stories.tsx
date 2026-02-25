import type { StoryObj } from "@storybook/react";

import { Line as LineStory, baseMeta } from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/Line",
};
type Story = StoryObj<typeof baseMeta>;

export const Line: Story = LineStory;
