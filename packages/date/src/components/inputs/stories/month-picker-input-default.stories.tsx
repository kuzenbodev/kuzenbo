import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./month-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MonthPickerInput/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
