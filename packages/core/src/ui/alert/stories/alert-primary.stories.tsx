import type { StoryObj } from "@storybook/react";

import { Primary as PrimaryStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Primary",
};
type Story = StoryObj<typeof baseMeta>;

export const Primary: Story = PrimaryStory;
