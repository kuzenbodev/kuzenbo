import type { StoryObj } from "@storybook/react";

import { Secondary as SecondaryStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Secondary",
};
type Story = StoryObj<typeof baseMeta>;

export const Secondary: Story = SecondaryStory;
