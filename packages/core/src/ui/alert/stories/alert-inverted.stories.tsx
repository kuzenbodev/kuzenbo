import type { StoryObj } from "@storybook/react";

import { Inverted as InvertedStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Inverted",
};
type Story = StoryObj<typeof baseMeta>;

export const Inverted: Story = InvertedStory;
