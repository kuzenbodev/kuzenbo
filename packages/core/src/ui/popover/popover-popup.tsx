"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { PopoverSize } from "./popover-size-context";

import { useResolvedPopoverSize } from "./popover-size-context";

const popoverPopupVariants = tv({
  base: "z-overlay flex origin-(--transform-origin) flex-col bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  variants: {
    size: {
      xs: "w-64 gap-1.5 rounded-[min(var(--radius-md),8px)] p-2 text-xs",
      sm: "w-72 gap-2 rounded-[min(var(--radius-md),10px)] p-3 text-sm",
      md: "w-80 gap-3 rounded-md p-4 text-sm",
      lg: "w-96 gap-3.5 rounded-md p-5 text-sm",
      xl: "w-[28rem] gap-4 rounded-md p-6 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type PopoverPopupVariantProps = Omit<
  VariantProps<typeof popoverPopupVariants>,
  "size"
> & {
  size?: PopoverSize;
};

export type PopoverPopupProps = PopoverPrimitive.Popup.Props &
  PopoverPopupVariantProps;

const PopoverPopup = ({ className, size, ...props }: PopoverPopupProps) => {
  const resolvedSize = useResolvedPopoverSize(size);

  return (
    <PopoverPrimitive.Popup
      className={cn(popoverPopupVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="popover-popup"
      {...props}
    />
  );
};

export { PopoverPopup };
