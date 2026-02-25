"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxGroupLabelVariants = tv({
  base: "text-muted-foreground",
  variants: {
    size: {
      xs: "px-1.5 py-1 text-xs",
      sm: "px-2 py-1 text-xs",
      md: "px-2 py-1.5 text-xs",
      lg: "px-2.5 py-1.5 text-sm",
      xl: "px-3 py-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxGroupLabelProps = ComboboxPrimitive.GroupLabel.Props &
  VariantProps<typeof comboboxGroupLabelVariants>;

const ComboboxGroupLabel = ({
  className,
  size,
  ...props
}: ComboboxGroupLabelProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.GroupLabel
      className={mergeBaseUIClassName<ComboboxPrimitive.GroupLabel.State>(
        comboboxGroupLabelVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-group-label"
      {...props}
    />
  );
};

export { ComboboxGroupLabel };
