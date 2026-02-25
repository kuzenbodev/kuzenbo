import type { StoryObj } from "@storybook/react";

import { Checked as CheckedStory, baseMeta } from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Checked",
};
type Story = StoryObj<typeof baseMeta>;

export const Checked: Story = CheckedStory;
