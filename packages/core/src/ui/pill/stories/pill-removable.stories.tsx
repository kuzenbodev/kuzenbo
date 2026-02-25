import type { StoryObj } from "@storybook/react";

import { Removable as RemovableStory, baseMeta } from "./pill-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pill/Removable",
};
type Story = StoryObj<typeof baseMeta>;

export const Removable: Story = RemovableStory;
