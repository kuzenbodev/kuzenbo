"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerContentVariants = tv({
  base: "mx-auto w-full",
  variants: {
    size: {
      xs: "max-w-[24rem]",
      sm: "max-w-[28rem]",
      md: "max-w-[32rem]",
      lg: "max-w-[36rem]",
      xl: "max-w-[40rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type DrawerContentVariantProps = Omit<
  VariantProps<typeof drawerContentVariants>,
  "size"
> & {
  size?: UISize;
};

export type DrawerContentProps = DrawerPrimitive.Content.Props &
  DrawerContentVariantProps;

const DrawerContent = ({ className, size, ...props }: DrawerContentProps) => {
  const resolvedSize = useResolvedDrawerSize(size);

  return (
    <DrawerPrimitive.Content
      className={cn(drawerContentVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="drawer-content"
      {...props}
    />
  );
};

export { DrawerContent };
