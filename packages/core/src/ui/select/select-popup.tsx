"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectOverlayContext } from "./select-overlay-context";

const selectPopupVariants = tv({
  base: "relative isolate z-overlay max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    size: {
      xs: "rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "rounded-[min(var(--radius-md),10px)] p-1",
      md: "rounded-md p-1",
      lg: "rounded-md p-1.5",
      xl: "rounded-md p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SelectPopupVariantProps = VariantProps<typeof selectPopupVariants>;

export type SelectPopupProps = ComponentProps<typeof SelectPrimitive.Popup> &
  SelectPopupVariantProps;

const SelectPopup = ({ className, size, ...props }: SelectPopupProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <SelectPrimitive.Popup
      className={mergeBaseUIClassName<SelectPrimitive.Popup.State>(
        selectPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-popup"
      {...props}
    />
  );
};

export { SelectPopup };
