"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxEmptyVariants = tv({
  base: "text-muted-foreground hidden w-full justify-center text-center group-data-empty/combobox-content:flex",
  variants: {
    size: {
      xs: "py-2 text-xs",
      sm: "py-2 text-sm",
      md: "py-2.5 text-sm",
      lg: "py-3 text-sm",
      xl: "py-3.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props &
  VariantProps<typeof comboboxEmptyVariants>;

const ComboboxEmpty = ({ className, size, ...props }: ComboboxEmptyProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.Empty
      className={mergeBaseUIClassName<ComboboxPrimitive.Empty.State>(
        comboboxEmptyVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-empty"
      {...props}
    />
  );
};

export { ComboboxEmpty };
