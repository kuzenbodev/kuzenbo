"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerDescriptionVariants = tv({
  base: "text-muted-foreground",
  variants: {
    size: {
      xs: "text-sm leading-5",
      sm: "text-sm leading-6",
      md: "text-base leading-6",
      lg: "text-base leading-7",
      xl: "text-lg leading-7",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerDescriptionVariantProps = Omit<
  VariantProps<typeof drawerDescriptionVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerDescriptionProps = DrawerPrimitive.Description.Props &
  DrawerDescriptionVariantProps;

const DrawerDescription = ({
  className,
  size,
  ...props
}: DrawerDescriptionProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Description
      className={cn(
        drawerDescriptionVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="drawer-description"
      {...props}
    />
  );
};

export { DrawerDescription };
