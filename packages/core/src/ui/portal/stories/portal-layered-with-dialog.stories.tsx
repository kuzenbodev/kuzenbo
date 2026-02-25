import type { StoryObj } from "@storybook/react";

import {
  LayeredWithDialog as LayeredWithDialogStory,
  baseMeta,
} from "./portal-story-shared";

export default {
  ...baseMeta,
  title: "Components/Portal/LayeredWithDialog",
};
type Story = StoryObj<typeof baseMeta>;

export const LayeredWithDialog: Story = LayeredWithDialogStory;
