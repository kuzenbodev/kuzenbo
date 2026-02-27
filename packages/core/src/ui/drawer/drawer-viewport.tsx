"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "tailwind-variants";

export type DrawerViewportProps = DrawerPrimitive.Viewport.Props;

const DrawerViewport = ({ className, ...props }: DrawerViewportProps) => (
  <DrawerPrimitive.Viewport
    className={cn(
      "fixed inset-0 z-overlay flex items-end justify-center p-(--viewport-padding) [--viewport-padding:0px] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem]",
      className
    )}
    data-slot="drawer-viewport"
    {...props}
  />
);

export { DrawerViewport };
