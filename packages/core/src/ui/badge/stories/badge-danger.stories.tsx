import type { StoryObj } from "@storybook/react";

import { Danger as DangerStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Danger",
};
type Story = StoryObj<typeof baseMeta>;

export const Danger: Story = DangerStory;
