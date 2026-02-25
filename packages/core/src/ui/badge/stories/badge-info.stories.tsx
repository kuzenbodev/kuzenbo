import type { StoryObj } from "@storybook/react";

import { Info as InfoStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Info",
};
type Story = StoryObj<typeof baseMeta>;

export const Info: Story = InfoStory;
