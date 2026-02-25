import type { StoryObj } from "@storybook/react";

import { Vertical as VerticalStory, baseMeta } from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/Vertical",
};
type Story = StoryObj<typeof baseMeta>;

export const Vertical: Story = VerticalStory;
