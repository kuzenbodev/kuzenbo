import type { StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { InputOTP } from "../input-otp";
import { baseMeta } from "./input-otp-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputOTP/ControlledValue",
};
type Story = StoryObj<typeof baseMeta>;

const ControlledValueDemo = () => {
  const [value, setValue] = useState("12");
  const handleClearClick = useCallback(() => {
    setValue("");
  }, []);

  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} onChange={setValue} value={value}>
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
      <div className="flex items-center gap-2">
        <button
          className="border-border bg-background h-8 rounded-md border px-2 text-sm"
          onClick={handleClearClick}
          type="button"
        >
          Clear code
        </button>
        <div className="text-muted-foreground text-sm">
          Controlled value: {value || "empty"}
        </div>
      </div>
    </div>
  );
};

export const ControlledValue: Story = {
  args: {
    maxLength: 6,
    render: () => null,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully controlled OTP state with external reset action and mirrored value output.",
      },
    },
  },
  render: () => <ControlledValueDemo />,
};
