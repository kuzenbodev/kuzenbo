"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "tailwind-variants";

export type DrawerIndentProps = DrawerPrimitive.Indent.Props;

const DrawerIndent = ({ className, ...props }: DrawerIndentProps) => (
  <DrawerPrimitive.Indent
    className={cn(
      "border-border bg-background text-foreground relative min-h-[320px] origin-[center_top] border [transition-duration:calc(400ms*var(--indent-transition)),calc(250ms*var(--indent-transition))] will-change-transform [--indent-progress:var(--drawer-swipe-progress)] [--indent-radius:calc(var(--radius-xl)*(1-var(--indent-progress)))] [--indent-transition:calc(1-clamp(0,calc(var(--drawer-swipe-progress)*100000),1))] [transition:transform_0.4s_cubic-bezier(0.32,0.72,0,1),border-radius_0.25s_cubic-bezier(0.32,0.72,0,1)] data-[active]:[transform:scale(calc(0.98+(0.02*var(--indent-progress))))_translateY(calc(0.5rem*(1-var(--indent-progress))))] data-[active]:[border-top-left-radius:var(--indent-radius)] data-[active]:[border-top-right-radius:var(--indent-radius)]",
      className
    )}
    data-slot="drawer-indent"
    {...props}
  />
);

export { DrawerIndent };
