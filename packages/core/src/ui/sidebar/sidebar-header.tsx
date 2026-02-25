import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type SidebarHeaderProps = ComponentProps<"div">;

const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => (
  <div
    className={cn("flex flex-col gap-2 p-2", className)}
    data-sidebar="header"
    data-slot="sidebar-header"
    {...props}
  />
);

export { SidebarHeader };
