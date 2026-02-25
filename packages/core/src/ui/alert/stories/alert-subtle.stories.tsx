import type { StoryObj } from "@storybook/react";

import { Subtle as SubtleStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Subtle",
};
type Story = StoryObj<typeof baseMeta>;

export const Subtle: Story = SubtleStory;
