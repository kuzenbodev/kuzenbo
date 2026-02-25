import type { StoryObj } from "@storybook/react";

import { Required as RequiredStory, baseMeta } from "./label-story-shared";

export default {
  ...baseMeta,
  title: "Components/Label/Required",
};
type Story = StoryObj<typeof baseMeta>;

export const Required: Story = RequiredStory;
