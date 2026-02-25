"use client";

import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerHeaderVariants = tv({
  base: "flex shrink-0 touch-none flex-col border-b border-border",
  variants: {
    size: {
      xs: "gap-1.5 px-4 pt-2.5 pb-2",
      sm: "gap-2 px-5 pt-3 pb-2.5",
      md: "gap-2.5 px-6 pt-3.5 pb-3",
      lg: "gap-3 px-7 pt-4 pb-3.5",
      xl: "gap-3.5 px-8 pt-4.5 pb-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerHeaderVariantProps = Omit<
  VariantProps<typeof drawerHeaderVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerHeaderProps = ComponentProps<"div"> &
  DrawerHeaderVariantProps;

const DrawerHeader = ({ className, size, ...props }: DrawerHeaderProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <div
      className={cn(drawerHeaderVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-header"
      {...props}
    />
  );
};

export { DrawerHeader };
