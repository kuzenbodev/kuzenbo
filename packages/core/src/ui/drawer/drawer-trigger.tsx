"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerTriggerVariants = tv({
  base: "inline-flex cursor-pointer items-center justify-center border border-border bg-background font-medium text-foreground transition-colors select-none hover:bg-muted focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "h-8 rounded-[min(var(--radius-md),8px)] px-2 text-xs",
      sm: "h-9 rounded-[min(var(--radius-md),10px)] px-3 text-sm",
      md: "h-10 rounded-md px-3.5 text-base md:text-sm",
      lg: "h-11 rounded-md px-4 text-base md:text-sm",
      xl: "h-12 rounded-md px-4.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerTriggerVariantProps = Omit<
  VariantProps<typeof drawerTriggerVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerTriggerProps = DrawerPrimitive.Trigger.Props &
  DrawerTriggerVariantProps;

const DrawerTrigger = ({ className, size, ...props }: DrawerTriggerProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Trigger
      className={cn(drawerTriggerVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-trigger"
      {...props}
    />
  );
};

export { DrawerTrigger };
