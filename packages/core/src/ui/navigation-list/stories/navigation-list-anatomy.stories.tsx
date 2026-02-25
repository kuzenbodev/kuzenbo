import type { StoryObj } from "@storybook/react";

import {
  Anatomy as AnatomyStory,
  baseMeta,
} from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/Anatomy",
};

type Story = StoryObj<typeof baseMeta>;

export const Anatomy: Story = AnatomyStory;
