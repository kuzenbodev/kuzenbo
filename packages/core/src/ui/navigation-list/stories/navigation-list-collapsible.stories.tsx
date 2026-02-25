import type { StoryObj } from "@storybook/react";

import {
  Collapsible as CollapsibleStory,
  baseMeta,
} from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/Collapsible",
};

type Story = StoryObj<typeof baseMeta>;

export const Collapsible: Story = CollapsibleStory;
