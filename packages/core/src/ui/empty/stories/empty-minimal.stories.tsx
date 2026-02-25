import type { StoryObj } from "@storybook/react";

import { Minimal as MinimalStory, baseMeta } from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/Minimal",
};
type Story = StoryObj<typeof baseMeta>;

export const Minimal: Story = MinimalStory;
