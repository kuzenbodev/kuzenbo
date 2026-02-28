"use client";

import type { ComponentProps, CSSProperties } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { Skeleton } from "../skeleton/skeleton";
import { SidebarMenuContext } from "./sidebar-menu-context";

const sidebarMenuSkeletonVariants = tv({
  base: "flex items-center gap-2 rounded-md",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-10 px-2.5",
      md: "h-8 px-2",
      sm: "h-7 px-2",
      xl: "h-11 px-3",
      xs: "h-6 px-1.5",
    },
  },
});

export type SidebarMenuSkeletonProps = ComponentProps<"div"> & {
  showIcon?: boolean;
  size?: InputSize;
} & VariantProps<typeof sidebarMenuSkeletonVariants>;

const SidebarMenuSkeleton = ({
  className,
  size,
  showIcon = false,
  ...props
}: SidebarMenuSkeletonProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";

  return (
    <div
      className={cn(
        sidebarMenuSkeletonVariants({ size: resolvedSize }),
        className
      )}
      data-sidebar="menu-skeleton"
      data-size={resolvedSize}
      data-slot="sidebar-menu-skeleton"
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": "100%",
          } as CSSProperties
        }
      />
    </div>
  );
};

export { SidebarMenuSkeleton };
