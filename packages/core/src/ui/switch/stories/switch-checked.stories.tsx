import type { StoryObj } from "@storybook/react";

import { Checked as CheckedStory, baseMeta } from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/Checked",
};
type Story = StoryObj<typeof baseMeta>;

export const Checked: Story = CheckedStory;
