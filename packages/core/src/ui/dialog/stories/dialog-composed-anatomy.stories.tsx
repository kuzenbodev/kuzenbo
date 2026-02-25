import type { StoryObj } from "@storybook/react";

import {
  ComposedAnatomy as ComposedAnatomyStory,
  baseMeta,
} from "./dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dialog/ComposedAnatomy",
};
type Story = StoryObj<typeof baseMeta>;

export const ComposedAnatomy: Story = ComposedAnatomyStory;
