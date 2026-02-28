"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxItemIndicatorVariants = tv({
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

type ComboboxItemIndicatorVariantProps = VariantProps<
  typeof comboboxItemIndicatorVariants
>;

export type ComboboxItemIndicatorProps = ComboboxPrimitive.ItemIndicator.Props &
  ComboboxItemIndicatorVariantProps;

const ComboboxItemIndicator = ({
  className,
  render,
  size,
  ...props
}: ComboboxItemIndicatorProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";
  const indicatorClassName = comboboxItemIndicatorVariants({
    size: resolvedSize,
  });

  return (
    <ComboboxPrimitive.ItemIndicator
      className={mergeBaseUIClassName<ComboboxPrimitive.ItemIndicator.State>(
        indicatorClassName,
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-item-indicator"
      render={render ?? <span className={indicatorClassName} />}
      {...props}
    />
  );
};

export { ComboboxItemIndicator };
