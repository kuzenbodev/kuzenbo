import type { StoryObj } from "@storybook/react";

import { Danger as DangerStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Danger",
};
type Story = StoryObj<typeof baseMeta>;

export const Danger: Story = DangerStory;
