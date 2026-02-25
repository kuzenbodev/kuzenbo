import type { StoryObj } from "@storybook/react";

import { Danger as DangerStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Danger",
};
type Story = StoryObj<typeof baseMeta>;

export const Danger: Story = DangerStory;
