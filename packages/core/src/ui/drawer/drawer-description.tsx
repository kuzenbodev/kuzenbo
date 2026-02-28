"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerDescriptionVariants = tv({
  base: "text-muted-foreground",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-base leading-7",
      md: "text-base leading-6",
      sm: "text-sm leading-6",
      xl: "text-lg leading-7",
      xs: "text-sm leading-5",
    },
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
