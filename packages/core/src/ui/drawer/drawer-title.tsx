"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerTitleVariants = tv({
  base: "text-foreground font-medium",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-xl leading-7",
      md: "text-lg leading-7",
      sm: "text-lg leading-6",
      xl: "text-2xl leading-8",
      xs: "text-base leading-6",
    },
  },
});

type DrawerTitleVariantProps = Omit<
  VariantProps<typeof drawerTitleVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerTitleProps = DrawerPrimitive.Title.Props &
  DrawerTitleVariantProps;

const DrawerTitle = ({ className, size, ...props }: DrawerTitleProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Title
      className={cn(drawerTitleVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-title"
      {...props}
    />
  );
};

export { DrawerTitle };
