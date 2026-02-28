"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerHeaderVariants = tv({
  base: "border-border flex shrink-0 touch-none flex-col border-b",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-3 px-7 pt-4 pb-3.5",
      md: "gap-2.5 px-6 pt-3.5 pb-3",
      sm: "gap-2 px-5 pt-3 pb-2.5",
      xl: "gap-3.5 px-8 pt-4.5 pb-4",
      xs: "gap-1.5 px-4 pt-2.5 pb-2",
    },
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
