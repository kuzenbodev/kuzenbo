import type { StoryObj } from "@storybook/react";

import { Pill as PillStory, baseMeta } from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/Pill",
};
type Story = StoryObj<typeof baseMeta>;

export const Pill: Story = PillStory;
