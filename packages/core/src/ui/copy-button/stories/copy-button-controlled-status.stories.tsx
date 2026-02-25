import type { StoryObj } from "@storybook/react";

import {
  ControlledStatus as ControlledStatusStory,
  baseMeta,
} from "./copy-button-story-shared";

export default {
  ...baseMeta,
  title: "Components/CopyButton/ControlledStatus",
};

type Story = StoryObj<typeof baseMeta>;

export const ControlledStatus: Story = ControlledStatusStory;
