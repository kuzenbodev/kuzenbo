import type { StoryObj } from "@storybook/react";

import {
  DropdownTypingClearable as DropdownTypingClearableStory,
  baseMeta,
} from "./date-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/DateInput/Dropdown Typing Clearable",
};

type Story = StoryObj<typeof baseMeta>;

export const DropdownTypingClearable: Story = DropdownTypingClearableStory;
