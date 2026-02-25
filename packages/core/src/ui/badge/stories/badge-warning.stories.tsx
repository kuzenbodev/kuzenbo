import type { StoryObj } from "@storybook/react";

import { Warning as WarningStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Warning",
};
type Story = StoryObj<typeof baseMeta>;

export const Warning: Story = WarningStory;
