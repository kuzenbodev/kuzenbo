import type { StoryObj } from "@storybook/react";

import {
  MarkdownMode as MarkdownModeStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/MarkdownMode",
};
type Story = StoryObj<typeof baseMeta>;

export const MarkdownMode: Story = MarkdownModeStory;
