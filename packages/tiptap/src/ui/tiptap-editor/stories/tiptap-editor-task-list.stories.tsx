import type { StoryObj } from "@storybook/react";

import {
  TaskList as TaskListStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/TaskList",
};
type Story = StoryObj<typeof baseMeta>;

export const TaskList: Story = TaskListStory;
