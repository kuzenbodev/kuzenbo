import type { StoryObj } from "@storybook/react";

import {
  ComposedAnatomy as ComposedAnatomyStory,
  baseMeta,
} from "./sheet-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sheet/ComposedAnatomy",
};
type Story = StoryObj<typeof baseMeta>;

export const ComposedAnatomy: Story = ComposedAnatomyStory;
