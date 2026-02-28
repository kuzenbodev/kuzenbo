import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Separator } from "../separator/separator";
export type SidebarSeparatorProps = ComponentProps<typeof Separator>;

const SidebarSeparator = ({ className, ...props }: SidebarSeparatorProps) => (
  <Separator
    className={cn("bg-sidebar-border w-auto", className)}
    data-sidebar="separator"
    data-slot="sidebar-separator"
    {...props}
  />
);

export { SidebarSeparator };
