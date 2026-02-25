import type { StoryObj } from "@storybook/react";

import { Overlay as OverlayStory, baseMeta } from "./spinner-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spinner/Overlay",
};
type Story = StoryObj<typeof baseMeta>;

export const Overlay: Story = OverlayStory;
