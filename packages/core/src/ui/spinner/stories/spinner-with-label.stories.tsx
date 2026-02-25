import type { StoryObj } from "@storybook/react";

import { WithLabel as WithLabelStory, baseMeta } from "./spinner-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spinner/WithLabel",
};
type Story = StoryObj<typeof baseMeta>;

export const WithLabel: Story = WithLabelStory;
