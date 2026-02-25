import type { StoryObj } from "@storybook/react";

import {
  LongPayload as LongPayloadStory,
  baseMeta,
} from "./qr-code-story-shared";

export default {
  ...baseMeta,
  title: "Components/QRCode/LongPayload",
};
type Story = StoryObj<typeof baseMeta>;

export const LongPayload: Story = LongPayloadStory;
