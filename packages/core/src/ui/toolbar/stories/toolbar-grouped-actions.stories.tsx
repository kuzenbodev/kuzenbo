import type { StoryObj } from "@storybook/react";

import {
  GroupedActions as GroupedActionsStory,
  baseMeta,
} from "./toolbar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toolbar/GroupedActions",
};

type Story = StoryObj<typeof baseMeta>;

export const GroupedActions: Story = GroupedActionsStory;
