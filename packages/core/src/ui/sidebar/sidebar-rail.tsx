import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { useSidebar } from "./use-sidebar";
export type SidebarRailProps = ComponentProps<"button">;

const SidebarRail = ({ className, ...props }: SidebarRailProps) => {
  const { state, toggleSidebar } = useSidebar();
  const isExpanded = state === "expanded";
  const label = isExpanded ? "Collapse Sidebar" : "Expand Sidebar";

  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      aria-label={label}
      className={cn(
        "z-elevated focus-visible:ring-sidebar-ring hover:after:bg-sidebar-border focus-visible:after:bg-sidebar-border absolute inset-y-0 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] focus-visible:ring-2 focus-visible:outline-none sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offExamples]:bg-sidebar group-data-[collapsible=offExamples]:translate-x-0 group-data-[collapsible=offExamples]:after:left-full",
        "[[data-side=left][data-collapsible=offExamples]_&]:-right-2",
        "[[data-side=right][data-collapsible=offExamples]_&]:-left-2",
        className
      )}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      onClick={toggleSidebar}
      title={label}
      {...props}
    />
  );
};

export { SidebarRail };
