"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxStatusVariants = tv({
  base: "flex items-center text-muted-foreground",
  variants: {
    size: {
      xs: "gap-1 px-1.5 py-1 text-xs",
      sm: "gap-1.5 px-2 py-1 text-sm",
      md: "gap-2 px-2 py-1.5 text-sm",
      lg: "gap-2 px-2.5 py-2 text-sm",
      xl: "gap-2.5 px-3 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxStatusProps = ComboboxPrimitive.Status.Props &
  VariantProps<typeof comboboxStatusVariants>;

const ComboboxStatus = ({ className, size, ...props }: ComboboxStatusProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.Status
      className={mergeBaseUIClassName<ComboboxPrimitive.Status.State>(
        comboboxStatusVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-status"
      {...props}
    />
  );
};

export { ComboboxStatus };
