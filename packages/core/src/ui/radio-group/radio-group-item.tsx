import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { CircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import { RadioGroupIndicator } from "./radio-group-indicator";

const radioGroupItemVariants = tv({
  base: "group/radio-group-item peer relative flex shrink-0 cursor-pointer rounded-full border border-input text-primary-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-foreground aria-invalid:ring-[3px] aria-invalid:ring-danger-foreground/20 dark:bg-input/30 dark:aria-invalid:border-danger-foreground/50 dark:aria-invalid:ring-danger-foreground/40",
  variants: {
    size: {
      xs: "aspect-square size-3 after:absolute after:-inset-1.5",
      sm: "aspect-square size-3.5 after:absolute after:-inset-2",
      md: "aspect-square size-4 after:absolute after:-inset-2.5",
      lg: "aspect-square size-[18px] after:absolute after:-inset-3",
      xl: "aspect-square size-5 after:absolute after:-inset-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioGroupItemVariantProps = Omit<
  VariantProps<typeof radioGroupItemVariants>,
  "size"
> & {
  size?: UISize;
};

export type RadioGroupItemProps = RadioPrimitive.Root.Props &
  RadioGroupItemVariantProps;

const RadioGroupItem = ({
  className,
  children,
  size: providedSize,
  ...props
}: RadioGroupItemProps) => {
  const size = useComponentSize(providedSize);

  return (
    <RadioPrimitive.Root
      className={mergeBaseUIClassName<RadioPrimitive.Root.State>(
        radioGroupItemVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="radio-group-item"
      {...props}
    >
      {children ?? (
        <RadioGroupIndicator size={size}>
          <HugeiconsIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-current data-[size=xs]:size-1.5 data-[size=sm]:size-1.5 data-[size=md]:size-2 data-[size=lg]:size-2 data-[size=xl]:size-2.5"
            data-size={size}
            icon={CircleIcon}
            strokeWidth={2}
          />
        </RadioGroupIndicator>
      )}
    </RadioPrimitive.Root>
  );
};

export { RadioGroupItem };
