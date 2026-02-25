import type { StoryObj } from "@storybook/react";

import { WithValue as WithValueStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/WithValue",
};
type Story = StoryObj<typeof baseMeta>;

export const WithValue: Story = WithValueStory;
