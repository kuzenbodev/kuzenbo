import type { StoryObj } from "@storybook/react";

import {
  DateObject as DateObjectStory,
  baseMeta,
} from "./time-value-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimeValue/Date Object",
};

type Story = StoryObj<typeof baseMeta>;

export const DateObject: Story = DateObjectStory;
