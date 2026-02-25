import type { StoryObj } from "@storybook/react";

import {
  WithAction as WithActionStory,
  baseMeta,
} from "./announcement-story-shared";

export default {
  ...baseMeta,
  title: "Components/Announcement/WithAction",
};
type Story = StoryObj<typeof baseMeta>;

export const WithAction: Story = WithActionStory;
