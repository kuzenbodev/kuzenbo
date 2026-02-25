import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";

const radioGroupIndicatorVariants = tv({
  base: "flex items-center justify-center text-primary group-aria-invalid/radio-group-item:text-danger",
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      md: "size-4",
      lg: "size-[18px]",
      xl: "size-5",
    },
  },
  defaultVariants: {
    size: "md",
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
