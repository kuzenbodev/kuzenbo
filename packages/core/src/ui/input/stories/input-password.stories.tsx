import type { StoryObj } from "@storybook/react";

import { Password as PasswordStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/Password",
};
type Story = StoryObj<typeof baseMeta>;

export const Password: Story = PasswordStory;
