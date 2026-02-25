import type { StoryObj } from "@storybook/react";

import {
  KeepMounted as KeepMountedStory,
  baseMeta,
} from "./collapsible-story-shared";

export default {
  ...baseMeta,
  title: "Components/Collapsible/KeepMounted",
};
type Story = StoryObj<typeof baseMeta>;

export const KeepMounted: Story = KeepMountedStory;
