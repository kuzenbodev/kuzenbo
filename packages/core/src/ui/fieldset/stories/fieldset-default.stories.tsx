import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./fieldset-story-shared";

export default {
  ...baseMeta,
  title: "Components/Fieldset/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
