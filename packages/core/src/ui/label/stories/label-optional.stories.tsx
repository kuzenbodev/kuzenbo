import type { StoryObj } from "@storybook/react";

import { Optional as OptionalStory, baseMeta } from "./label-story-shared";

export default {
  ...baseMeta,
  title: "Components/Label/Optional",
};
type Story = StoryObj<typeof baseMeta>;

export const Optional: Story = OptionalStory;
