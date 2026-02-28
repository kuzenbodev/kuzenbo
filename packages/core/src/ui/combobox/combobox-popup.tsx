"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxPopupVariants = tv({
  base: "group/combobox-content bg-popover text-popover-foreground ring-foreground/10 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-36 min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden shadow-md ring-1 duration-100 data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:shadow-none",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "rounded-lg",
      md: "rounded-lg",
      sm: "rounded-[min(var(--radius-md),10px)]",
      xl: "rounded-xl",
      xs: "rounded-[min(var(--radius-md),8px)]",
    },
  },
});

type ComboboxPopupVariantProps = VariantProps<typeof comboboxPopupVariants>;

export type ComboboxPopupProps = ComboboxPrimitive.Popup.Props &
  ComboboxPopupVariantProps;

const ComboboxPopup = ({ className, size, ...props }: ComboboxPopupProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <ComboboxPrimitive.Popup
      className={mergeBaseUIClassName<ComboboxPrimitive.Popup.State>(
        comboboxPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-popup"
      {...props}
    />
  );
};

export { ComboboxPopup };
