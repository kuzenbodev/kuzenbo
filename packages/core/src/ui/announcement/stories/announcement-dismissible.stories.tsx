import type { StoryObj } from "@storybook/react";

import {
  Dismissible as DismissibleStory,
  baseMeta,
} from "./announcement-story-shared";

export default {
  ...baseMeta,
  title: "Components/Announcement/Dismissible",
};
type Story = StoryObj<typeof baseMeta>;

export const Dismissible: Story = DismissibleStory;
