import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./mock-data-table-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/MockDataTable/WithAdditionalMetrics",
};
type Story = StoryObj<typeof baseMeta>;

export const WithAdditionalMetrics: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "With Additional Metrics scenario.",
      },
    },
  },
};
