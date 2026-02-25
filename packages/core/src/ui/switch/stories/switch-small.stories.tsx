import type { StoryObj } from "@storybook/react";

import { Small as SmallStory, baseMeta } from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/Small",
};
type Story = StoryObj<typeof baseMeta>;

export const Small: Story = SmallStory;
