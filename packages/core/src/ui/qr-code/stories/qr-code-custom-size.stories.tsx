import type { StoryObj } from "@storybook/react";

import {
  CustomSize as CustomSizeStory,
  baseMeta,
} from "./qr-code-story-shared";

export default {
  ...baseMeta,
  title: "Components/QRCode/CustomSize",
};
type Story = StoryObj<typeof baseMeta>;

export const CustomSize: Story = CustomSizeStory;
