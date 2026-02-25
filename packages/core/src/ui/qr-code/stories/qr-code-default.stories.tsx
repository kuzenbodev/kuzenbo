import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./qr-code-story-shared";

export default {
  ...baseMeta,
  title: "Components/QRCode/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
