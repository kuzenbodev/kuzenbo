import type { StoryObj } from "@storybook/react";

import { Link as LinkStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Link",
};
type Story = StoryObj<typeof baseMeta>;

export const Link: Story = LinkStory;
