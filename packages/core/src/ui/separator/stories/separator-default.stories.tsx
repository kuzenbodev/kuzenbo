import type { StoryObj } from "@storybook/react";

import {
  Default as SeparatorDefaultStory,
  baseMeta,
} from "./separator-story-shared";

export default {
  ...baseMeta,
  title: "Components/Separator/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = SeparatorDefaultStory;
