"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxRowVariants = tv({
  base: "grid w-full",
  variants: {
    size: {
      xs: "scroll-my-1",
      sm: "scroll-my-1",
      md: "scroll-my-1.5",
      lg: "scroll-my-2",
      xl: "scroll-my-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ComboboxRowProps = ComboboxPrimitive.Row.Props &
  VariantProps<typeof comboboxRowVariants>;

const ComboboxRow = ({ className, size, ...props }: ComboboxRowProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.Row
      className={mergeBaseUIClassName<ComboboxPrimitive.Row.State>(
        comboboxRowVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-row"
      {...props}
    />
  );
};

export { ComboboxRow };
