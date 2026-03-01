"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useResolvedDrawerSize } from "./drawer-size-context";

const drawerContentVariants = tv({
  base: "mx-auto w-full",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "max-w-[var(--kb-drawer-content-max-width-lg,36rem)]",
      md: "max-w-[var(--kb-drawer-content-max-width-md,32rem)]",
      sm: "max-w-[var(--kb-drawer-content-max-width-sm,28rem)]",
      xl: "max-w-[var(--kb-drawer-content-max-width-xl,40rem)]",
      xs: "max-w-[var(--kb-drawer-content-max-width-xs,24rem)]",
    },
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
