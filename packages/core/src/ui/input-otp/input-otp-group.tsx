import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { InputOTPContext } from "./input-otp-context";

const inputOTPGroupVariants = tv({
  base: "has-aria-invalid:border-danger has-aria-invalid:ring-danger/20 dark:has-aria-invalid:ring-danger/40 flex items-center has-aria-invalid:ring-[3px]",
  variants: {
    size: {
      xs: "rounded-[min(var(--radius-md),8px)]",
      sm: "rounded-[min(var(--radius-md),10px)]",
      md: "rounded-md",
      lg: "rounded-md",
      xl: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
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
