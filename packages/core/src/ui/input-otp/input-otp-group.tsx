import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { InputOTPContext } from "./input-otp-context";

const inputOTPGroupVariants = tv({
  base: "has-aria-invalid:border-danger has-aria-invalid:ring-danger/20 dark:has-aria-invalid:ring-danger/40 flex items-center has-aria-invalid:ring-[3px]",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "rounded-md",
      md: "rounded-md",
      sm: "rounded-[min(var(--radius-md),10px)]",
      xl: "rounded-md",
      xs: "rounded-[min(var(--radius-md),8px)]",
    },
  },
});

type InputOTPGroupVariantProps = VariantProps<typeof inputOTPGroupVariants>;

export type InputOTPGroupProps = ComponentProps<"div"> &
  InputOTPGroupVariantProps & {
    size?: InputSize;
  };

const InputOTPGroup = ({ className, size, ...props }: InputOTPGroupProps) => {
  const { size: rootSize } = useContext(InputOTPContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <div
      className={cn(inputOTPGroupVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="input-otp-group"
      {...props}
    />
  );
};

export { InputOTPGroup };
