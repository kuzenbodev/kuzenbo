import type { StoryObj } from "@storybook/react";

import { Bordered as BorderedStory, baseMeta } from "./accordion-story-shared";

export default {
  ...baseMeta,
  title: "Components/Accordion/Bordered",
};
type Story = StoryObj<typeof baseMeta>;

export const Bordered: Story = BorderedStory;
