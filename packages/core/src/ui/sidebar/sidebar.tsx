"use client";

import type { ComponentProps, CSSProperties } from "react";

import { cn } from "tailwind-variants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../sheet/sheet";
import { SIDEBAR_WIDTH_MOBILE } from "./constants";
import { SidebarContent } from "./sidebar-content";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarGroup } from "./sidebar-group";
import { SidebarGroupAction } from "./sidebar-group-action";
import { SidebarGroupContent } from "./sidebar-group-content";
import { SidebarGroupLabel } from "./sidebar-group-label";
import { SidebarHeader } from "./sidebar-header";
import { SidebarInput } from "./sidebar-input";
import { SidebarInset } from "./sidebar-inset";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarMenuAction } from "./sidebar-menu-action";
import { SidebarMenuBadge } from "./sidebar-menu-badge";
import { SidebarMenuButton } from "./sidebar-menu-button";
import { SidebarMenuItem } from "./sidebar-menu-item";
import { SidebarMenuSkeleton } from "./sidebar-menu-skeleton";
import { SidebarMenuSub } from "./sidebar-menu-sub";
import { SidebarMenuSubButton } from "./sidebar-menu-sub-button";
import { SidebarMenuSubItem } from "./sidebar-menu-sub-item";
import { SidebarProvider } from "./sidebar-provider";
import { SidebarRail } from "./sidebar-rail";
import { SidebarSeparator } from "./sidebar-separator";
import { SidebarTrigger } from "./sidebar-trigger";
import { useSidebar } from "./use-sidebar";
export type SidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offExamples" | "icon" | "none";
};

const Sidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offExamples",
  className,
  children,
  ...props
}: SidebarProps) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        data-slot="sidebar"
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
        <SheetContent
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          data-mobile="true"
          data-sidebar="sidebar"
          data-slot="sidebar"
          side={side}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as CSSProperties
          }
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-side={side}
      data-slot="sidebar"
      data-state={state}
      data-variant={variant}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offExamples]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
        data-slot="sidebar-gap"
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offExamples]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offExamples]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        data-slot="sidebar-container"
        {...props}
      >
        <div
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarGroup;
Sidebar.GroupAction = SidebarGroupAction;
Sidebar.GroupContent = SidebarGroupContent;
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.Header = SidebarHeader;
Sidebar.Input = SidebarInput;
Sidebar.Inset = SidebarInset;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuAction = SidebarMenuAction;
Sidebar.MenuBadge = SidebarMenuBadge;
Sidebar.MenuButton = SidebarMenuButton;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuSkeleton = SidebarMenuSkeleton;
Sidebar.MenuSub = SidebarMenuSub;
Sidebar.MenuSubButton = SidebarMenuSubButton;
Sidebar.MenuSubItem = SidebarMenuSubItem;
Sidebar.Provider = SidebarProvider;
Sidebar.Rail = SidebarRail;
Sidebar.Separator = SidebarSeparator;
Sidebar.Trigger = SidebarTrigger;

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

export type { SidebarContentProps } from "./sidebar-content";
export type { SidebarFooterProps } from "./sidebar-footer";
export type { SidebarGroupProps } from "./sidebar-group";
export type { SidebarGroupActionProps } from "./sidebar-group-action";
export type { SidebarGroupContentProps } from "./sidebar-group-content";
export type { SidebarGroupLabelProps } from "./sidebar-group-label";
export type { SidebarHeaderProps } from "./sidebar-header";
export type { SidebarInputProps } from "./sidebar-input";
export type { SidebarInsetProps } from "./sidebar-inset";
export type { SidebarMenuProps } from "./sidebar-menu";
export type { SidebarMenuActionProps } from "./sidebar-menu-action";
export type { SidebarMenuBadgeProps } from "./sidebar-menu-badge";
export type { SidebarMenuButtonProps } from "./sidebar-menu-button";
export type { SidebarMenuItemProps } from "./sidebar-menu-item";
export type { SidebarMenuSkeletonProps } from "./sidebar-menu-skeleton";
export type { SidebarMenuSubProps } from "./sidebar-menu-sub";
export type { SidebarMenuSubButtonProps } from "./sidebar-menu-sub-button";
export type { SidebarMenuSubItemProps } from "./sidebar-menu-sub-item";
export type { SidebarProviderProps } from "./sidebar-provider";
export type { SidebarRailProps } from "./sidebar-rail";
export type { SidebarSeparatorProps } from "./sidebar-separator";
export type { SidebarTriggerProps } from "./sidebar-trigger";
