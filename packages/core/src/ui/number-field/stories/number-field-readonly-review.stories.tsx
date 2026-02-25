import type { StoryObj } from "@storybook/react";

import {
  ReadOnlyReview as ReadOnlyReviewStory,
  baseMeta,
} from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/ReadOnlyReview",
};
type Story = StoryObj<typeof baseMeta>;

export const ReadOnlyReview: Story = ReadOnlyReviewStory;
