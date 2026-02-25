import type { StoryObj } from "@storybook/react";

import { SideRight as SideRightStory, baseMeta } from "./sheet-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sheet/SideRight",
};
type Story = StoryObj<typeof baseMeta>;

export const SideRight: Story = SideRightStory;
