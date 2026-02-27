import type { StoryObj } from "@storybook/react";

import {
  Multiple as MultipleStory,
  baseMeta,
} from "./date-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DatePickerInput/Multiple",
};

type Story = StoryObj<typeof baseMeta>;

export const Multiple: Story = MultipleStory;
