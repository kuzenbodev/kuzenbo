"use client";

import { SidebarLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, type ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Button } from "../button/button";
import { useSidebar } from "./use-sidebar";
export type SidebarTriggerProps = ComponentProps<typeof Button>;

const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  const handleClick = useCallback(
    (
      event: Parameters<
        NonNullable<ComponentProps<typeof Button>["onClick"]>
      >[0]
    ) => {
      onClick?.(event);
      toggleSidebar();
    },
    [onClick, toggleSidebar]
  );

  return (
    <Button
      className={cn("cursor-clickable", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={handleClick}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export { SidebarTrigger };
