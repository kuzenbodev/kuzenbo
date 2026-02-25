import type { StoryObj } from "@storybook/react";

import {
  InteractiveContent as InteractiveContentStory,
  baseMeta,
} from "./preview-card-story-shared";

export default {
  ...baseMeta,
  title: "Components/PreviewCard/InteractiveContent",
};
type Story = StoryObj<typeof baseMeta>;

export const InteractiveContent: Story = InteractiveContentStory;
