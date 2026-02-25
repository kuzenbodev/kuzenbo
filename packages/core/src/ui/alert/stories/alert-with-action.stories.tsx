import type { StoryObj } from "@storybook/react";

import { WithAction as WithActionStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/WithAction",
};
type Story = StoryObj<typeof baseMeta>;

export const WithAction: Story = WithActionStory;
