import type { StoryObj } from "@storybook/react";

import { Small as SmallStory, baseMeta } from "./card-story-shared";

export default {
  ...baseMeta,
  title: "Components/Card/Small",
};
type Story = StoryObj<typeof baseMeta>;

export const Small: Story = SmallStory;
