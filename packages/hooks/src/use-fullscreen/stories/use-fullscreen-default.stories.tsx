import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-fullscreen-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useFullscreen/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
