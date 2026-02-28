"use client";

import { OTPInput } from "input-otp";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { InputOTPContext } from "./input-otp-context";
import { InputOTPGroup } from "./input-otp-group";
import { InputOTPSeparator } from "./input-otp-separator";
import { InputOTPSlot } from "./input-otp-slot";

type NativeInputOTPProps = ComponentProps<typeof OTPInput>;
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type InputOTPProps = DistributiveOmit<NativeInputOTPProps, "size"> & {
  containerClassName?: string;
  size?: InputSize;
};

const InputOTP = ({
  className,
  containerClassName,
  size: providedSize,
  ...props
}: InputOTPProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <InputOTPContext.Provider value={contextValue}>
      <OTPInput
        className={cn("disabled:cursor-not-allowed", className)}
        containerClassName={cn(
          "cn-input-otp flex items-center has-disabled:opacity-50",
          containerClassName
        )}
        data-size={size}
        data-slot="input-otp"
        spellCheck={false}
        {...props}
      />
    </InputOTPContext.Provider>
  );
};

InputOTP.Group = InputOTPGroup;
InputOTP.Separator = InputOTPSeparator;
InputOTP.Slot = InputOTPSlot;

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };

export type { InputOTPGroupProps } from "./input-otp-group";
export type { InputOTPSeparatorProps } from "./input-otp-separator";
export type { InputOTPSlotProps } from "./input-otp-slot";
