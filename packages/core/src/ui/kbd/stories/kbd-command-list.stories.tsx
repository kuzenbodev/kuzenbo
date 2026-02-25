import type { StoryObj } from "@storybook/react";

import { CommandList as CommandListStory, baseMeta } from "./kbd-story-shared";

export default {
  ...baseMeta,
  title: "Components/Kbd/CommandList",
};
type Story = StoryObj<typeof baseMeta>;

export const CommandList: Story = CommandListStory;
