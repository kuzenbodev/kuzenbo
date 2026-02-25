import type { StoryObj } from "@storybook/react";

import {
  WithEllipsis as WithEllipsisStory,
  baseMeta,
} from "./pagination-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pagination/WithEllipsis",
};
type Story = StoryObj<typeof baseMeta>;

export const WithEllipsis: Story = WithEllipsisStory;
