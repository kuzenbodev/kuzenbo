import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./form-story-shared";

export default {
  ...baseMeta,
  title: "Components/Form/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
