import type { StoryObj } from "@storybook/react";

import {
  Multiple as MultipleStory,
  baseMeta,
} from "./year-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/YearPickerInput/Multiple",
};

type Story = StoryObj<typeof baseMeta>;

export const Multiple: Story = MultipleStory;
