import type { StoryObj } from "@storybook/react";

import { MinMax as MinMaxStory, baseMeta } from "./time-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimeInput/Min Max",
};

type Story = StoryObj<typeof baseMeta>;

export const MinMax: Story = MinMaxStory;
