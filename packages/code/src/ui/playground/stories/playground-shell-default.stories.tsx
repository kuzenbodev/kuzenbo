import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  FullOutputWithPreset as FullOutputWithPresetStory,
  LockedPresetWithoutCode as LockedPresetWithoutCodeStory,
  PreviewOnly as PreviewOnlyStory,
  baseMeta,
} from "./playground-shell-story-shared";

export default {
  ...baseMeta,
  title: "Code/Playground/PlaygroundShell/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const PreviewOnly: Story = PreviewOnlyStory;

export const FullOutputWithPreset: Story = FullOutputWithPresetStory;

export const LockedPresetWithoutCode: Story = LockedPresetWithoutCodeStory;
