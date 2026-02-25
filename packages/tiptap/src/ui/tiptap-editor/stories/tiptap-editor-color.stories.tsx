import type { StoryObj } from "@storybook/react";

import { Color as ColorStory, baseMeta } from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Color",
};
type Story = StoryObj<typeof baseMeta>;

export const Color: Story = ColorStory;
