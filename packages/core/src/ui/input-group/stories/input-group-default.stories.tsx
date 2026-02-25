import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
