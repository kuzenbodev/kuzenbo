import type { StoryObj } from "@storybook/react";

import {
  VerticalPanels as VerticalPanelsStory,
  baseMeta,
} from "./resizable-story-shared";

export default {
  ...baseMeta,
  title: "Components/Resizable/VerticalPanels",
};
type Story = StoryObj<typeof baseMeta>;

export const VerticalPanels: Story = VerticalPanelsStory;
