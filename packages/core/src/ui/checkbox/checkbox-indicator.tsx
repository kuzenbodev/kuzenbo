import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";

const checkboxIndicatorVariants = tv({
  base: "grid place-content-center text-current transition-none",
  variants: {
    size: {
      xs: "[&>svg]:size-2",
      sm: "[&>svg]:size-2.5",
      md: "[&>svg]:size-3",
      lg: "[&>svg]:size-3.5",
      xl: "[&>svg]:size-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CheckboxIndicatorVariantProps = Omit<
  VariantProps<typeof checkboxIndicatorVariants>,
  "size"
> & {
  size?: UISize;
};

export type CheckboxIndicatorProps = CheckboxPrimitive.Indicator.Props &
  CheckboxIndicatorVariantProps;

const CheckboxIndicator = ({
  className,
  size: providedSize,
  ...props
}: CheckboxIndicatorProps) => {
  const size = useComponentSize(providedSize);

  return (
    <CheckboxPrimitive.Indicator
      className={mergeBaseUIClassName<CheckboxPrimitive.Indicator.State>(
        checkboxIndicatorVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="checkbox-indicator"
      {...props}
    />
  );
};

export { CheckboxIndicator };
