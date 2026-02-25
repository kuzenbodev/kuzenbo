import type { StoryObj } from "@storybook/react";

import { Block as CodeBlockStory, baseMeta } from "./code-story-shared";

export default {
  ...baseMeta,
  title: "Components/Code/Block",
};
type Story = StoryObj<typeof baseMeta>;

export const Block: Story = CodeBlockStory;
