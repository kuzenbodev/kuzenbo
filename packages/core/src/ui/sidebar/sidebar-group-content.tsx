import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type SidebarGroupContentProps = ComponentProps<"div">;

const SidebarGroupContent = ({
  className,
  ...props
}: SidebarGroupContentProps) => (
  <div
    className={cn("w-full text-sm", className)}
    data-sidebar="group-content"
    data-slot="sidebar-group-content"
    {...props}
  />
);

export { SidebarGroupContent };
