"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "tailwind-variants";

export type DrawerBackdropProps = DrawerPrimitive.Backdrop.Props;

const DrawerBackdrop = ({ className, ...props }: DrawerBackdropProps) => (
  <DrawerPrimitive.Backdrop
    className={cn(
      "fixed inset-0 z-50 min-h-dvh bg-foreground opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.2] [--bleed:3rem] data-[ending-style]:opacity-0 data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:opacity-0 data-[swiping]:duration-0 supports-[-webkit-touch-callout:none]:absolute dark:bg-background dark:[--backdrop-opacity:0.7]",
      className
    )}
    data-slot="drawer-backdrop"
    {...props}
  />
);

export { DrawerBackdrop };
