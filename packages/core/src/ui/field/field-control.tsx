import type { ComponentProps } from "react";

import { Field as BaseField } from "@base-ui/react/field";
import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";

type NativeFieldControlProps = ComponentProps<typeof BaseField.Control>;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

const fieldControlVariants = tv({
  base: "w-full min-w-0 border border-input bg-transparent transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 py-0.5 text-xs",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-sm",
      md: "h-9 rounded-md px-2.5 py-1 text-base md:text-sm",
      lg: "h-10 rounded-md px-3 py-1.5 text-base md:text-sm",
      xl: "h-11 rounded-md px-4 py-1.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type FieldControlVariantProps = Omit<
  VariantProps<typeof fieldControlVariants>,
  "size"
> & {
  size?: UISize;
};

export type FieldControlProps = DistributiveOmit<
  NativeFieldControlProps,
  "size"
> &
  FieldControlVariantProps;

export const FieldControl = ({
  className,
  size: providedSize,
  ...props
}: FieldControlProps) => {
  const size = useComponentSize(providedSize);

  return (
    <BaseField.Control
      className={mergeBaseUIClassName(
        fieldControlVariants({ size }),
        className
      )}
      data-size={size}
      data-slot="field-control"
      {...props}
    />
  );
};
