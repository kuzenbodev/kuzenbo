"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "tailwind-variants";

export type DrawerIndentBackgroundProps =
  DrawerPrimitive.IndentBackground.Props;

const DrawerIndentBackground = ({
  className,
  ...props
}: DrawerIndentBackgroundProps) => (
  <DrawerPrimitive.IndentBackground
    className={cn(
      "absolute inset-0 -z-10 bg-foreground transition-opacity duration-300 data-[active]:opacity-100 [&:not([data-active])]:opacity-0",
      className
    )}
    data-slot="drawer-indent-background"
    {...props}
  />
);

export { DrawerIndentBackground };
