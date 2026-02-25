import type { StoryObj } from "@storybook/react";

import {
  StatusVariants as StatusVariantsStory,
  baseMeta,
} from "./pill-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pill/StatusVariants",
};
type Story = StoryObj<typeof baseMeta>;

export const StatusVariants: Story = StatusVariantsStory;
