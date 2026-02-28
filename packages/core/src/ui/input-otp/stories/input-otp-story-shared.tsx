import type { Meta, StoryObj } from "@storybook/react";

import type { InputSize } from "../../input/input";
import { InputOTP } from "../input-otp";

const inputOTPSizes: InputSize[] = ["xs", "sm", "md", "lg", "xl"];

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: inputOTPSizes,
    },
  },
  component: InputOTP,
  tags: ["autodocs"],
  title: "Components/InputOTP",
} satisfies Meta<typeof InputOTP>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    maxLength: 6,
    render: () => null,
    size: "md",
  },
  render: ({ size }) => (
    <InputOTP maxLength={6} size={size}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const Sizes: Story = {
  args: {
    maxLength: 6,
    render: () => null,
  },
  render: () => (
    <div className="grid gap-3">
      {inputOTPSizes.map((size) => (
        <InputOTP key={size} maxLength={6} size={size}>
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
      ))}
    </div>
  ),
};
