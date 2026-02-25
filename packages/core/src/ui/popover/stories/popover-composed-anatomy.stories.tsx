import type { StoryObj } from "@storybook/react";

import {
  ComposedAnatomy as ComposedAnatomyStory,
  baseMeta,
} from "./popover-story-shared";

export default {
  ...baseMeta,
  title: "Components/Popover/ComposedAnatomy",
};
type Story = StoryObj<typeof baseMeta>;

export const ComposedAnatomy: Story = ComposedAnatomyStory;
