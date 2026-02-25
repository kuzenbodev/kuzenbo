import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type SidebarMenuItemProps = ComponentProps<"li">;

const SidebarMenuItem = ({ className, ...props }: SidebarMenuItemProps) => (
  <li
    className={cn("group/menu-item relative", className)}
    data-sidebar="menu-item"
    data-slot="sidebar-menu-item"
    {...props}
  />
);

export { SidebarMenuItem };
