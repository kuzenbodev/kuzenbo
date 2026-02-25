import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-clipboard-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useClipboard/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
