"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxRowVariants = tv({
  base: "grid w-full",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "scroll-my-2",
      md: "scroll-my-1.5",
      sm: "scroll-my-1",
      xl: "scroll-my-2.5",
      xs: "scroll-my-1",
    },
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
