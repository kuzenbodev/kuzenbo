import type { StoryObj } from "@storybook/react";

import { Secondary as SecondaryStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Secondary",
};
type Story = StoryObj<typeof baseMeta>;

export const Secondary: Story = SecondaryStory;
