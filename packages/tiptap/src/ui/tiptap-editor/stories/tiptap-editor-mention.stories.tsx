import type { StoryObj } from "@storybook/react";

import {
  Mention as MentionStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Mention",
};
type Story = StoryObj<typeof baseMeta>;

export const Mention: Story = MentionStory;
