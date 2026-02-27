import type { StoryObj } from "@storybook/react";

import {
  SelectionModes as SelectionModesStory,
  baseMeta,
} from "./calendar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/Calendar/Selection Modes",
};

type Story = StoryObj<typeof baseMeta>;

export const SelectionModes: Story = SelectionModesStory;
