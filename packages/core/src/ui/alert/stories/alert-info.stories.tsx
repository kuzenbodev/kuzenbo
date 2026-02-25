import type { StoryObj } from "@storybook/react";

import { Info as InfoStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Info",
};
type Story = StoryObj<typeof baseMeta>;

export const Info: Story = InfoStory;
