import type { StoryObj } from "@storybook/react";

import {
  JsonMode as JsonModeStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/JsonMode",
};
type Story = StoryObj<typeof baseMeta>;

export const JsonMode: Story = JsonModeStory;
