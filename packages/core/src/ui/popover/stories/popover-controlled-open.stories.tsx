import type { StoryObj } from "@storybook/react";

import {
  ControlledOpen as ControlledOpenStory,
  baseMeta,
} from "./popover-story-shared";

export default {
  ...baseMeta,
  title: "Components/Popover/ControlledOpen",
};
type Story = StoryObj<typeof baseMeta>;

export const ControlledOpen: Story = ControlledOpenStory;
