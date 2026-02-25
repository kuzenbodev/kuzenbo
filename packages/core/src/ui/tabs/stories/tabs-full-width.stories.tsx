import type { StoryObj } from "@storybook/react";

import { FullWidth as FullWidthStory, baseMeta } from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/FullWidth",
};
type Story = StoryObj<typeof baseMeta>;

export const FullWidth: Story = FullWidthStory;
