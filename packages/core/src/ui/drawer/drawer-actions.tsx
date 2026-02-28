"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerActionsVariants = tv({
  base: "flex justify-end",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-4",
      md: "gap-4",
      sm: "gap-2.5",
      xl: "gap-5",
      xs: "gap-2",
    },
  },
});

type DrawerActionsVariantProps = Omit<
  VariantProps<typeof drawerActionsVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerActionsProps = ComponentProps<"div"> &
  DrawerActionsVariantProps;

const DrawerActions = ({ className, size, ...props }: DrawerActionsProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <div
      className={cn(drawerActionsVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-actions"
      {...props}
    />
  );
};

export { DrawerActions };
