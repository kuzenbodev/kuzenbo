import type { StoryObj } from "@storybook/react";

import { Success as SuccessStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Success",
};
type Story = StoryObj<typeof baseMeta>;

export const Success: Story = SuccessStory;
