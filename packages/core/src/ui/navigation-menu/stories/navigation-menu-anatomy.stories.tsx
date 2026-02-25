import type { StoryObj } from "@storybook/react";

import {
  Anatomy as AnatomyStory,
  baseMeta,
} from "./navigation-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationMenu/Anatomy",
};

type Story = StoryObj<typeof baseMeta>;

export const Anatomy: Story = AnatomyStory;
