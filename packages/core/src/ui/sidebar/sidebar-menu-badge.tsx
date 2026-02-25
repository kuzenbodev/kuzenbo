import type { ComponentProps } from "react";

import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { SidebarMenuContext } from "./sidebar-menu-context";

const sidebarMenuBadgeVariants = tv({
  base: "pointer-events-none absolute right-1 flex items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground",
  variants: {
    size: {
      xs: "top-0.5 h-4 min-w-4 text-[10px]",
      sm: "top-1 h-5 min-w-5 text-[11px]",
      md: "top-1.5 h-5 min-w-5 text-xs",
      lg: "top-2 h-6 min-w-6 text-xs",
      xl: "top-2.5 h-7 min-w-7 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SidebarMenuBadgeProps = ComponentProps<"div"> &
  VariantProps<typeof sidebarMenuBadgeVariants> & {
    size?: InputSize;
  };

const SidebarMenuBadge = ({
  className,
  size,
  ...props
}: SidebarMenuBadgeProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";

  return (
    <div
      className={cn(
        sidebarMenuBadgeVariants({ size: resolvedSize }),
        className
      )}
      data-sidebar="menu-badge"
      data-size={resolvedSize}
      data-slot="sidebar-menu-badge"
      {...props}
    />
  );
};

export { SidebarMenuBadge };
