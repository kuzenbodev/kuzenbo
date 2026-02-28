import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";

const radioGroupIndicatorVariants = tv({
  base: "text-primary group-aria-invalid/radio-group-item:text-danger flex items-center justify-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "size-[18px]",
      md: "size-4",
      sm: "size-3.5",
      xl: "size-5",
      xs: "size-3",
    },
  },
});

type RadioGroupIndicatorVariantProps = Omit<
  VariantProps<typeof radioGroupIndicatorVariants>,
  "size"
> & {
  size?: UISize;
};

export type RadioGroupIndicatorProps = RadioPrimitive.Indicator.Props &
  RadioGroupIndicatorVariantProps;

const RadioGroupIndicator = ({
  className,
  size: providedSize,
  ...props
}: RadioGroupIndicatorProps) => {
  const size = useComponentSize(providedSize);

  return (
    <RadioPrimitive.Indicator
      className={mergeBaseUIClassName<RadioPrimitive.Indicator.State>(
        radioGroupIndicatorVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="radio-group-indicator"
      {...props}
    />
  );
};

export { RadioGroupIndicator };
