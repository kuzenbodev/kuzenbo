import type { StoryObj } from "@storybook/react";

import {
  ToolbarSticky as ToolbarStickyStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/ToolbarSticky",
};
type Story = StoryObj<typeof baseMeta>;

export const ToolbarSticky: Story = ToolbarStickyStory;
