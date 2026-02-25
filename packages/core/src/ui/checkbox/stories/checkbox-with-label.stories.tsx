import type { StoryObj } from "@storybook/react";

import { WithLabel as WithLabelStory, baseMeta } from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/WithLabel",
};
type Story = StoryObj<typeof baseMeta>;

export const WithLabel: Story = WithLabelStory;
