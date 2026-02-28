"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerCloseVariants = tv({
  base: "cursor-clickable text-foreground hover:bg-muted focus-visible:outline-ring active:bg-muted inline-flex items-center justify-center rounded-md transition-colors select-none focus-visible:outline focus-visible:-outline-offset-1 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "size-6 text-sm",
      sm: "size-7 text-base",
      md: "size-7 text-base",
      lg: "size-8 text-base",
      xl: "size-9 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerCloseVariantProps = Omit<
  VariantProps<typeof drawerCloseVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerCloseProps = DrawerPrimitive.Close.Props &
  DrawerCloseVariantProps;

const DrawerClose = ({ className, size, ...props }: DrawerCloseProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Close
      className={cn(drawerCloseVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-close"
      {...props}
    />
  );
};

export { DrawerClose };
