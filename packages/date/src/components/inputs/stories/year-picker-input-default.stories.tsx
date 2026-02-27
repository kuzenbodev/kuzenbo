import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./year-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/YearPickerInput/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
