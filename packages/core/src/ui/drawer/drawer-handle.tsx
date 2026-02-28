"use client";

import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerHandleVariants = tv({
  base: "bg-muted-foreground/40 mx-auto h-1 shrink-0 rounded-full",
  variants: {
    size: {
      xs: "mb-3 w-10",
      sm: "mb-3.5 w-11",
      md: "mb-4 w-12",
      lg: "mb-4 w-14",
      xl: "mb-5 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerHandleVariantProps = Omit<
  VariantProps<typeof drawerHandleVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerHandleProps = ComponentProps<"div"> &
  DrawerHandleVariantProps;

const DrawerHandle = ({ className, size, ...props }: DrawerHandleProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <div
      aria-hidden
      className={cn(drawerHandleVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-handle"
      {...props}
    />
  );
};

export { DrawerHandle };
