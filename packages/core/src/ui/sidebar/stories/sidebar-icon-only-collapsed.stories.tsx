import type { StoryObj } from "@storybook/react";

import {
  IconOnlyCollapsed as IconOnlyCollapsedStory,
  baseMeta,
} from "./sidebar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sidebar/IconOnlyCollapsed",
};

type Story = StoryObj<typeof baseMeta>;

export const IconOnlyCollapsed: Story = IconOnlyCollapsedStory;
