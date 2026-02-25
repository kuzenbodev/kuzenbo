import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./combobox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Combobox/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
