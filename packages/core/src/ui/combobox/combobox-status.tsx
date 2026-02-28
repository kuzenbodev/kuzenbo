"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxStatusVariants = tv({
  base: "text-muted-foreground flex items-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-2 px-2.5 py-2 text-sm",
      md: "gap-2 px-2 py-1.5 text-sm",
      sm: "gap-1.5 px-2 py-1 text-sm",
      xl: "gap-2.5 px-3 py-2.5 text-base",
      xs: "gap-1 px-1.5 py-1 text-xs",
    },
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
