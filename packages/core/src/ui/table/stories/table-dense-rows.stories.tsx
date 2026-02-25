import type { StoryObj } from "@storybook/react";

import { DenseRows as DenseRowsStory, baseMeta } from "./table-story-shared";

export default {
  ...baseMeta,
  title: "Components/Table/DenseRows",
};
type Story = StoryObj<typeof baseMeta>;

export const DenseRows: Story = DenseRowsStory;
