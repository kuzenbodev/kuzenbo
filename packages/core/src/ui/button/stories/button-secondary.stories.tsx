import type { StoryObj } from "@storybook/react";

import { Secondary as SecondaryStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Secondary",
};
type Story = StoryObj<typeof baseMeta>;

export const Secondary: Story = SecondaryStory;
