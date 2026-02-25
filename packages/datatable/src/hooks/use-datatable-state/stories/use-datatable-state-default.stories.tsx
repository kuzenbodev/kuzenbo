import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-datatable-state-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/useDatatableState/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
