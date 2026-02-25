"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectOverlayContext } from "./select-overlay-context";

const selectItemIndicatorVariants = tv({
  base: "pointer-events-none absolute flex items-center justify-center",
  variants: {
    size: {
      xs: "right-1.5 size-3",
      sm: "right-2 size-3.5",
      md: "right-2 size-4",
      lg: "right-2.5 size-4",
      xl: "right-3 size-5",
    },
  },
  defaultVariants: {
    size: "md",
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
