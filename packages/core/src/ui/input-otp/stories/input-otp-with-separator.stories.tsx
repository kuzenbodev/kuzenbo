import type { StoryObj } from "@storybook/react";

import { InputOTP } from "../input-otp";
import { baseMeta } from "./input-otp-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputOTP/WithSeparator",
};
type Story = StoryObj<typeof baseMeta>;

export const WithSeparator: Story = {
  args: {
    maxLength: 6,
    render: () => null,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Classic 3-3 OTP layout with a separator between code groups.",
      },
    },
  },
  render: ({ size }) => (
    <InputOTP maxLength={6} size={size}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};
