import type { StoryObj } from "@storybook/react";

import { Success as SuccessStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Success",
};
type Story = StoryObj<typeof baseMeta>;

export const Success: Story = SuccessStory;
