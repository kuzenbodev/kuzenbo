"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { SelectOverlayContext } from "./select-overlay-context";

const selectItemIndicatorVariants = tv({
  base: "pointer-events-none absolute flex items-center justify-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "right-2.5 size-4",
      md: "right-2 size-4",
      sm: "right-2 size-3.5",
      xl: "right-3 size-5",
      xs: "right-1.5 size-3",
    },
  },
});

type SelectItemIndicatorVariantProps = VariantProps<
  typeof selectItemIndicatorVariants
>;

export type SelectItemIndicatorProps = ComponentProps<
  typeof SelectPrimitive.ItemIndicator
> &
  SelectItemIndicatorVariantProps;

const SelectItemIndicator = ({
  className,
  render,
  size,
  ...props
}: SelectItemIndicatorProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";
  const indicatorClassName = selectItemIndicatorVariants({
    size: resolvedSize,
  });

  return (
    <SelectPrimitive.ItemIndicator
      className={mergeBaseUIClassName<SelectPrimitive.ItemIndicator.State>(
        indicatorClassName,
        className
      )}
      data-size={resolvedSize}
      data-slot="select-item-indicator"
      render={render ?? <span className={indicatorClassName} />}
      {...props}
    />
  );
};

export { SelectItemIndicator };
