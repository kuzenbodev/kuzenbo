import type { StoryObj } from "@storybook/react";

import { MinMax as MinMaxStory, baseMeta } from "./date-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DateInput/Min Max",
};

type Story = StoryObj<typeof baseMeta>;

export const MinMax: Story = MinMaxStory;
