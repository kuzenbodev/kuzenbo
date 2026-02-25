import type { StoryObj } from "@storybook/react";

import {
  MinMaxConstraints as MinMaxConstraintsStory,
  baseMeta,
} from "./resizable-story-shared";

export default {
  ...baseMeta,
  title: "Components/Resizable/MinMaxConstraints",
};
type Story = StoryObj<typeof baseMeta>;

export const MinMaxConstraints: Story = MinMaxConstraintsStory;
