import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
