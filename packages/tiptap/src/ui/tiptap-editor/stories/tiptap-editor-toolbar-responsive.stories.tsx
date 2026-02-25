import type { StoryObj } from "@storybook/react";

import {
  ToolbarResponsive as ToolbarResponsiveStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/ToolbarResponsive",
};
type Story = StoryObj<typeof baseMeta>;

export const ToolbarResponsive: Story = ToolbarResponsiveStory;
