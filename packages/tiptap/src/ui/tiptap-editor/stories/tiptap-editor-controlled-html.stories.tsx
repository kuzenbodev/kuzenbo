import type { StoryObj } from "@storybook/react";

import {
  ControlledHtml as ControlledHtmlStory,
  baseMeta,
} from "./tiptap-editor-story-shared";

export default {
  ...baseMeta,
  title: "Tiptap/TiptapEditor/ControlledHtml",
};
type Story = StoryObj<typeof baseMeta>;

export const ControlledHtml: Story = ControlledHtmlStory;
