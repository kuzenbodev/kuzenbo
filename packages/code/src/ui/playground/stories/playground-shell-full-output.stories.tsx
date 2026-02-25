import type { StoryObj } from "@storybook/react";

import {
  FullOutput as FullOutputStory,
  baseMeta,
} from "./playground-shell-story-shared";

export default {
  ...baseMeta,
  title: "Code/Playground/PlaygroundShell/FullOutput",
};

type Story = StoryObj<typeof baseMeta>;

export const FullOutput: Story = FullOutputStory;
