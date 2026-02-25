import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./form-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/FormField/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
