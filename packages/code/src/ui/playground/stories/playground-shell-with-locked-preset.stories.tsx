import type { StoryObj } from "@storybook/react";

import {
  WithLockedPreset as WithLockedPresetStory,
  baseMeta,
} from "./playground-shell-story-shared";

export default {
  ...baseMeta,
  title: "Code/Playground/PlaygroundShell/WithLockedPreset",
};

type Story = StoryObj<typeof baseMeta>;

export const WithLockedPreset: Story = WithLockedPresetStory;
