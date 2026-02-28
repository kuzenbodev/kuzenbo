"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { CheckboxIndicator } from "./checkbox-indicator";

const checkboxVariants = tv({
  base: "peer cursor-clickable border-input text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 aria-invalid:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:bg-input/30 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 dark:data-checked:bg-primary dark:data-indeterminate:bg-primary relative flex shrink-0 items-center justify-center border shadow-xs transition-colors outline-none group-has-disabled/field:opacity-50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px]",
  variants: {
    size: {
      xs: "size-3 rounded-[3px] after:absolute after:-inset-1.5",
      sm: "size-3.5 rounded-[3.5px] after:absolute after:-inset-2",
      md: "size-4 rounded-[4px] after:absolute after:-inset-2.5",
      lg: "size-[18px] rounded-[4px] after:absolute after:-inset-3",
      xl: "size-5 rounded-[5px] after:absolute after:-inset-3.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CheckboxVariantProps = Omit<
  VariantProps<typeof checkboxVariants>,
  "size"
> & {
  size?: UISize;
};

export type CheckboxProps = CheckboxPrimitive.Root.Props & CheckboxVariantProps;

const Checkbox = ({
  className,
  indeterminate,
  children,
  size: providedSize,
  ...props
}: CheckboxProps) => {
  const size = useComponentSize(providedSize);

  return (
    <CheckboxPrimitive.Root
      className={mergeBaseUIClassName<CheckboxPrimitive.Root.State>(
        checkboxVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="checkbox"
      indeterminate={indeterminate}
      {...props}
    >
      {children ?? (
        <CheckboxIndicator size={size}>
          {indeterminate ? (
            <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} />
          ) : (
            <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
          )}
        </CheckboxIndicator>
      )}
    </CheckboxPrimitive.Root>
  );
};

Checkbox.Indicator = CheckboxIndicator;

export type { CheckboxIndicatorProps } from "./checkbox-indicator";
export { Checkbox, CheckboxIndicator };
