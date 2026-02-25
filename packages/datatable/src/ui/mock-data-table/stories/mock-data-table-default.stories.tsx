import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./mock-data-table-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/MockDataTable/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
