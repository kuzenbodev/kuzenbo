import type { StoryObj } from "@storybook/react";

import { Table as TableStory, baseMeta } from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Table",
};
type Story = StoryObj<typeof baseMeta>;

export const Table: Story = TableStory;
