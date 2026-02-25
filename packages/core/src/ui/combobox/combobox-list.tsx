"use client";

import type { CSSProperties } from "react";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxListVariants = tv({
  base: "no-scrollbar overflow-y-auto overscroll-contain data-empty:p-0",
  variants: {
    size: {
      xs: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-0.5 p-0.5",
      sm: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1 p-1",
      md: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1 p-1",
      lg: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-1.5 p-1.5",
      xl: "max-h-[min(calc(--spacing(72)-var(--kb-combobox-anchor-offset)),calc(var(--available-height)-var(--kb-combobox-anchor-offset)))] scroll-py-2 p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const comboboxAnchorOffsetBySize: Record<InputSize, string> = {
  xs: "1.5rem",
  sm: "2rem",
  md: "2.25rem",
  lg: "2.5rem",
  xl: "2.75rem",
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
