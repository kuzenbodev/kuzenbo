import type { StoryObj } from "@storybook/react";

import { Slash as SlashStory, baseMeta } from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/Slash",
};
type Story = StoryObj<typeof baseMeta>;

export const Slash: Story = SlashStory;
