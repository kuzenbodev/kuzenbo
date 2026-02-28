import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type SidebarMenuSubItemProps = ComponentProps<"li">;

const SidebarMenuSubItem = ({
  className,
  ...props
}: SidebarMenuSubItemProps) => (
  <li
    className={cn("group/menu-sub-item relative", className)}
    data-sidebar="menu-sub-item"
    data-slot="sidebar-menu-sub-item"
    {...props}
  />
);

export { SidebarMenuSubItem };
