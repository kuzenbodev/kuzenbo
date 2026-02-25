import type { StoryObj } from "@storybook/react";

import { WithLink as WithLinkStory, baseMeta } from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/WithLink",
};
type Story = StoryObj<typeof baseMeta>;

export const WithLink: Story = WithLinkStory;
