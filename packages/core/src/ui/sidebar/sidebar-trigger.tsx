"use client";

import { SidebarLeftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback } from "react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { ActionIcon } from "../action-icon/action-icon";
import { useSidebar } from "./use-sidebar";
export type SidebarTriggerProps = ComponentProps<typeof ActionIcon>;

const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  const handleClick = useCallback(
    (
      event: Parameters<
        NonNullable<ComponentProps<typeof ActionIcon>["onClick"]>
      >[0]
    ) => {
      onClick?.(event);
      toggleSidebar();
    },
    [onClick, toggleSidebar]
  );

  return (
    <ActionIcon
      className={cn("cursor-clickable", className)}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      onClick={handleClick}
      size="sm"
      variant="ghost"
      {...props}
    >
      <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
      <span className="sr-only">Toggle Sidebar</span>
    </ActionIcon>
  );
};

export { SidebarTrigger };
