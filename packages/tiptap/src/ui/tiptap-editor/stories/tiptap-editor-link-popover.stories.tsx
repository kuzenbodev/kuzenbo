import type { StoryObj } from "@storybook/react";

import {
  LinkPopover as LinkPopoverStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/LinkPopover",
};
type Story = StoryObj<typeof baseMeta>;

export const LinkPopover: Story = LinkPopoverStory;
