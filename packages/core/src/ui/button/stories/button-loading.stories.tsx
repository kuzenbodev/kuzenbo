import type { StoryObj } from "@storybook/react";

import { Loading as LoadingStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Loading",
};
type Story = StoryObj<typeof baseMeta>;

export const Loading: Story = LoadingStory;
