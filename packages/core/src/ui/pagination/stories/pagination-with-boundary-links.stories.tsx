import type { StoryObj } from "@storybook/react";

import {
  WithBoundaryLinks as WithBoundaryLinksStory,
  baseMeta,
} from "./pagination-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pagination/WithBoundaryLinks",
};
type Story = StoryObj<typeof baseMeta>;

export const WithBoundaryLinks: Story = WithBoundaryLinksStory;
