import type { StoryObj } from "@storybook/react";

import {
  DelayedOpen as DelayedOpenStory,
  baseMeta,
} from "./preview-card-story-shared";

export default {
  ...baseMeta,
  title: "Components/PreviewCard/DelayedOpen",
};
type Story = StoryObj<typeof baseMeta>;

export const DelayedOpen: Story = DelayedOpenStory;
