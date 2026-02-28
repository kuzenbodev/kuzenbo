"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxGroupLabelVariants = tv({
  base: "text-muted-foreground",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-2.5 py-1.5 text-sm",
      md: "px-2 py-1.5 text-xs",
      sm: "px-2 py-1 text-xs",
      xl: "px-3 py-2 text-sm",
      xs: "px-1.5 py-1 text-xs",
    },
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
