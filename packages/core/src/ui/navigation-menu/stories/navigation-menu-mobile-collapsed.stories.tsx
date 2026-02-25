import type { StoryObj } from "@storybook/react";

import {
  MobileCollapsed as MobileCollapsedStory,
  baseMeta,
} from "./navigation-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationMenu/MobileCollapsed",
};

type Story = StoryObj<typeof baseMeta>;

export const MobileCollapsed: Story = MobileCollapsedStory;
