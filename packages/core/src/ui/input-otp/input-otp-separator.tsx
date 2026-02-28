import { MinusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { InputOTPContext } from "./input-otp-context";

const inputOTPSeparatorVariants = tv({
  base: "flex items-center justify-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "[&_svg:not([class*='size-'])]:size-4",
      md: "[&_svg:not([class*='size-'])]:size-4",
      sm: "[&_svg:not([class*='size-'])]:size-3.5",
      xl: "[&_svg:not([class*='size-'])]:size-5",
      xs: "[&_svg:not([class*='size-'])]:size-3",
    },
  },
});

type InputOTPSeparatorVariantProps = VariantProps<
  typeof inputOTPSeparatorVariants
>;

export type InputOTPSeparatorProps = ComponentProps<"div"> &
  InputOTPSeparatorVariantProps & {
    size?: InputSize;
  };

const InputOTPSeparator = ({
  className,
  size,
  ...props
}: InputOTPSeparatorProps) => {
  const { size: rootSize } = useContext(InputOTPContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";

  return (
    <div
      className={cn(
        inputOTPSeparatorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="input-otp-separator"
      role="separator"
      {...props}
    >
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
    </div>
  );
};

export { InputOTPSeparator };
