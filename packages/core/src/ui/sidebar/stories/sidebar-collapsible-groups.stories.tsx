import type { StoryObj } from "@storybook/react";

import {
  CollapsibleGroups as CollapsibleGroupsStory,
  baseMeta,
} from "./sidebar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sidebar/CollapsibleGroups",
};

type Story = StoryObj<typeof baseMeta>;

export const CollapsibleGroups: Story = CollapsibleGroupsStory;
