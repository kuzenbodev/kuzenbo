import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./input-otp-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputOTP/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
