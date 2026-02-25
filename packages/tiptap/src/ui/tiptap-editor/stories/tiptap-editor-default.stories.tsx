import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
