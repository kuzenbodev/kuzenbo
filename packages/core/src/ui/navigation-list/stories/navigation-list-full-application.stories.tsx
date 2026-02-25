import type { StoryObj } from "@storybook/react";

import {
  FullApplication as FullApplicationStory,
  baseMeta,
} from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/FullApplication",
};

type Story = StoryObj<typeof baseMeta>;

export const FullApplication: Story = FullApplicationStory;
