import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./accordion-story-shared";

export default {
  ...baseMeta,
  title: "Components/Accordion/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
