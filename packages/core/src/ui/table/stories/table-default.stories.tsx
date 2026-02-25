import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./table-story-shared";

export default {
  ...baseMeta,
  title: "Components/Table/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
