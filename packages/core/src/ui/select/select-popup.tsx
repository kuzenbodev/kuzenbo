"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { SelectOverlayContext } from "./select-overlay-context";

const selectPopupVariants = tv({
  base: "z-overlay bg-popover text-popover-foreground ring-foreground/10 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative isolate max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto shadow-md ring-1 duration-100",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "rounded-md p-1.5",
      md: "rounded-md p-1",
      sm: "rounded-[min(var(--radius-md),10px)] p-1",
      xl: "rounded-md p-2",
      xs: "rounded-[min(var(--radius-md),8px)] p-0.5",
    },
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
