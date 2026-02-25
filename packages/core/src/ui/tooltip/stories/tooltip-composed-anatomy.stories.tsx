import type { StoryObj } from "@storybook/react";

import {
  ComposedAnatomy as ComposedAnatomyStory,
  baseMeta,
} from "./tooltip-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tooltip/ComposedAnatomy",
};
type Story = StoryObj<typeof baseMeta>;

export const ComposedAnatomy: Story = ComposedAnatomyStory;
