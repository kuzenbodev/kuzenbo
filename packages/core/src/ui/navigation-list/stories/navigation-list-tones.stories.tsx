import type { StoryObj } from "@storybook/react";

import { Tones as TonesStory, baseMeta } from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/Tones",
};

type Story = StoryObj<typeof baseMeta>;

export const Tones: Story = TonesStory;
