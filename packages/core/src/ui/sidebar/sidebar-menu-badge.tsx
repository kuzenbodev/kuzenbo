import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { SidebarMenuContext } from "./sidebar-menu-context";

const sidebarMenuBadgeVariants = tv({
  base: "text-sidebar-foreground peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground pointer-events-none absolute right-1 flex items-center justify-center rounded-md px-1 font-medium tabular-nums select-none group-data-[collapsible=icon]:hidden",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "top-2 h-6 min-w-6 text-xs",
      md: "top-1.5 h-5 min-w-5 text-xs",
      sm: "top-1 h-5 min-w-5 text-[11px]",
      xl: "top-2.5 h-7 min-w-7 text-sm",
      xs: "top-0.5 h-4 min-w-4 text-[10px]",
    },
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
