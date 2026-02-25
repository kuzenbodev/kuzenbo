import type { StoryObj } from "@storybook/react";

import { WithForm as WithFormStory, baseMeta } from "./card-story-shared";

export default {
  ...baseMeta,
  title: "Components/Card/WithForm",
};
type Story = StoryObj<typeof baseMeta>;

export const WithForm: Story = WithFormStory;
