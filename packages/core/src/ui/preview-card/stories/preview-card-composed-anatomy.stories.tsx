import type { StoryObj } from "@storybook/react";

import {
  ComposedAnatomy as ComposedAnatomyStory,
  baseMeta,
} from "./preview-card-story-shared";

export default {
  ...baseMeta,
  title: "Components/PreviewCard/ComposedAnatomy",
};
type Story = StoryObj<typeof baseMeta>;

export const ComposedAnatomy: Story = ComposedAnatomyStory;
