import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  FullOutput as FullOutputStory,
  PreviewOnly as PreviewOnlyStory,
  baseMeta,
} from "./playground-shell-story-shared";

export default {
  ...baseMeta,
  title: "Code/Playground/PlaygroundShell/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const FullOutput: Story = FullOutputStory;

export const PreviewOnly: Story = PreviewOnlyStory;
