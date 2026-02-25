import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./preview-card-story-shared";

export default {
  ...baseMeta,
  title: "Components/PreviewCard/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
