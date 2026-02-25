import type { StoryObj } from "@storybook/react";

import { Email as EmailStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/Email",
};
type Story = StoryObj<typeof baseMeta>;

export const Email: Story = EmailStory;
