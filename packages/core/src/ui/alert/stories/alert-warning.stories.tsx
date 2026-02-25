import type { StoryObj } from "@storybook/react";

import { Warning as WarningStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Warning",
};
type Story = StoryObj<typeof baseMeta>;

export const Warning: Story = WarningStory;
