import type { StoryObj } from "@storybook/react";

import { Ghost as GhostStory, baseMeta } from "./accordion-story-shared";

export default {
  ...baseMeta,
  title: "Components/Accordion/Ghost",
};
type Story = StoryObj<typeof baseMeta>;

export const Ghost: Story = GhostStory;
