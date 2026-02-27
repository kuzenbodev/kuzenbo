import type { StoryObj } from "@storybook/react";

import {
  Multiple as MultipleStory,
  baseMeta,
} from "./month-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MonthPickerInput/Multiple",
};

type Story = StoryObj<typeof baseMeta>;

export const Multiple: Story = MultipleStory;
