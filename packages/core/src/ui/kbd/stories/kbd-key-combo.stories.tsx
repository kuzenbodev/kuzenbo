import type { StoryObj } from "@storybook/react";

import { KeyCombo as KeyComboStory, baseMeta } from "./kbd-story-shared";

export default {
  ...baseMeta,
  title: "Components/Kbd/KeyCombo",
};
type Story = StoryObj<typeof baseMeta>;

export const KeyCombo: Story = KeyComboStory;
