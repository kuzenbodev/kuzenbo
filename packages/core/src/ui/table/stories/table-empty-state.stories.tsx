import type { StoryObj } from "@storybook/react";

import { EmptyState as EmptyStateStory, baseMeta } from "./table-story-shared";

export default {
  ...baseMeta,
  title: "Components/Table/EmptyState",
};
type Story = StoryObj<typeof baseMeta>;

export const EmptyState: Story = EmptyStateStory;
