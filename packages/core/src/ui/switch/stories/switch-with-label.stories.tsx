import type { StoryObj } from "@storybook/react";

import { WithLabel as WithLabelStory, baseMeta } from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/WithLabel",
};
type Story = StoryObj<typeof baseMeta>;

export const WithLabel: Story = WithLabelStory;
