"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type { CSSProperties } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxListVariants = tv({
  base: "no-scrollbar overflow-y-auto overscroll-contain data-empty:p-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1.5 p-1.5",
      md: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1 p-1",
      sm: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1 p-1",
      xl: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-2 p-2",
      xs: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-0.5 p-0.5",
    },
  },
});

const comboboxAnchorOffsetBySize: Record<InputSize, string> = {
  lg: "2.5rem",
  md: "2.25rem",
  sm: "2rem",
  xl: "2.75rem",
  xs: "1.5rem",
};

export type ComboboxListProps = ComboboxPrimitive.List.Props &
  VariantProps<typeof comboboxListVariants>;

const ComboboxList = ({
  className,
  size,
  style,
  ...props
}: ComboboxListProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.List
      className={mergeBaseUIClassName<ComboboxPrimitive.List.State>(
        comboboxListVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-list"
      style={
        {
          "--kb-combobox-anchor-offset":
            comboboxAnchorOffsetBySize[resolvedSize],
          ...style,
        } as CSSProperties & { "--kb-combobox-anchor-offset": string }
      }
      {...props}
    />
  );
};

export { ComboboxList };
