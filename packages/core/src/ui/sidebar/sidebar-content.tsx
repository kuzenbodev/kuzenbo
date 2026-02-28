import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type SidebarContentProps = ComponentProps<"div">;

const SidebarContent = ({ className, ...props }: SidebarContentProps) => (
  <div
    className={cn(
      "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      className
    )}
    data-sidebar="content"
    data-slot="sidebar-content"
    {...props}
  />
);

export { SidebarContent };
