import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./mock-data-table-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/MockDataTable/EmptyState",
};
type Story = StoryObj<typeof baseMeta>;

export const EmptyState: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Empty State scenario.",
      },
    },
  },
};
