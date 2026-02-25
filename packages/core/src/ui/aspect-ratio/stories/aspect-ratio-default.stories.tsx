import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./aspect-ratio-story-shared";

export default {
  ...baseMeta,
  title: "Components/AspectRatio/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
