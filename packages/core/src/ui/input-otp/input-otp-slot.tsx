import { OTPInputContext } from "input-otp";
import { type ComponentProps, useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { InputOTPContext } from "./input-otp-context";

const inputOTPSlotVariants = tv({
  slots: {
    caret: "animate-caret-blink bg-foreground duration-1000",
    root: "border-input aria-invalid:border-danger data-[active=true]:z-raised data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-danger data-[active=true]:aria-invalid:ring-danger/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-danger/40 relative flex items-center justify-center border-y border-r shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:ring-[3px]",
  },
  variants: {
    size: {
      xs: {
        caret: "h-3 w-px",
        root: "size-6 text-xs first:rounded-l-[min(var(--radius-md),8px)] last:rounded-r-[min(var(--radius-md),8px)]",
      },
      sm: {
        caret: "h-3.5 w-px",
        root: "size-8 text-sm first:rounded-l-[min(var(--radius-md),10px)] last:rounded-r-[min(var(--radius-md),10px)]",
      },
      md: {
        caret: "h-4 w-px",
        root: "size-9 text-base first:rounded-l-md last:rounded-r-md md:text-sm",
      },
      lg: {
        caret: "h-4 w-px",
        root: "size-10 text-base first:rounded-l-md last:rounded-r-md md:text-sm",
      },
      xl: {
        caret: "h-5 w-px",
        root: "size-11 text-base first:rounded-l-md last:rounded-r-md",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type InputOTPSlotVariantProps = VariantProps<typeof inputOTPSlotVariants>;
export type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number;
} & InputOTPSlotVariantProps & {
    size?: InputSize;
  };

const InputOTPSlot = ({
  index,
  className,
  size,
  ...props
}: InputOTPSlotProps) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { size: rootSize } = useContext(InputOTPContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const resolvedSize: InputSize = size ?? rootSize ?? "md";
  const { caret, root } = inputOTPSlotVariants({ size: resolvedSize });

  return (
    <div
      className={cn(root(), className)}
      data-active={isActive}
      data-size={resolvedSize}
      data-slot="input-otp-slot"
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className={caret()} />
        </div>
      )}
    </div>
  );
};

export { InputOTPSlot };
