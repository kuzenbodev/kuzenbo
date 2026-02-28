"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerTriggerVariants = tv({
  base: "cursor-clickable border-border bg-background text-foreground hover:bg-muted focus-visible:outline-ring active:bg-muted inline-flex items-center justify-center border font-medium transition-colors select-none focus-visible:outline focus-visible:-outline-offset-1 disabled:pointer-events-none disabled:opacity-50",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-11 rounded-md px-4 text-base md:text-sm",
      md: "h-10 rounded-md px-3.5 text-base md:text-sm",
      sm: "h-9 rounded-[min(var(--radius-md),10px)] px-3 text-sm",
      xl: "h-12 rounded-md px-4.5 text-base",
      xs: "h-8 rounded-[min(var(--radius-md),8px)] px-2 text-xs",
    },
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
