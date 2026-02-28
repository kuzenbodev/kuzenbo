"use client";

import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { MenubarArrow } from "./menubar-arrow";
import { MenubarBackdrop } from "./menubar-backdrop";
import { MenubarCheckboxItem } from "./menubar-checkbox-item";
import { MenubarContent } from "./menubar-content";
import { MenubarContext } from "./menubar-context";
import { MenubarGroup } from "./menubar-group";
import { MenubarItem } from "./menubar-item";
import { MenubarLabel } from "./menubar-label";
import { MenubarLinkItem } from "./menubar-link-item";
import { MenubarMenu } from "./menubar-menu";
import { MenubarPopup } from "./menubar-popup";
import { MenubarPortal } from "./menubar-portal";
import { MenubarPositioner } from "./menubar-positioner";
import { MenubarRadioGroup } from "./menubar-radio-group";
import { MenubarRadioItem } from "./menubar-radio-item";
import { MenubarSeparator } from "./menubar-separator";
import { MenubarShortcut } from "./menubar-shortcut";
import { MenubarSub } from "./menubar-sub";
import { MenubarSubContent } from "./menubar-sub-content";
import { MenubarSubTrigger } from "./menubar-sub-trigger";
import { MenubarTrigger } from "./menubar-trigger";

const menubarVariants = tv({
  base: "border-border bg-background flex items-center border",
  variants: {
    size: {
      xs: "h-7 gap-0.5 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "h-8 gap-0.5 rounded-[min(var(--radius-md),10px)] p-0.5",
      md: "h-9 gap-1 rounded-md p-1",
      lg: "h-10 gap-1 rounded-md p-1",
      xl: "h-11 gap-1.5 rounded-md p-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarProps = MenubarPrimitive.Props &
  VariantProps<typeof menubarVariants> & {
    size?: InputSize;
  };

const Menubar = ({ className, size: providedSize, ...props }: MenubarProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <MenubarContext.Provider value={contextValue}>
      <MenubarPrimitive
        className={cn(menubarVariants({ size }), className)}
        data-size={size}
        data-slot="menubar"
        {...props}
      />
    </MenubarContext.Provider>
  );
};

Menubar.Arrow = MenubarArrow;
Menubar.Backdrop = MenubarBackdrop;
Menubar.CheckboxItem = MenubarCheckboxItem;
Menubar.Content = MenubarContent;
Menubar.Group = MenubarGroup;
Menubar.Item = MenubarItem;
Menubar.Label = MenubarLabel;
Menubar.LinkItem = MenubarLinkItem;
Menubar.Menu = MenubarMenu;
Menubar.Portal = MenubarPortal;
Menubar.Popup = MenubarPopup;
Menubar.Positioner = MenubarPositioner;
Menubar.RadioGroup = MenubarRadioGroup;
Menubar.RadioItem = MenubarRadioItem;
Menubar.Separator = MenubarSeparator;
Menubar.Shortcut = MenubarShortcut;
Menubar.Sub = MenubarSub;
Menubar.SubContent = MenubarSubContent;
Menubar.SubTrigger = MenubarSubTrigger;
Menubar.Trigger = MenubarTrigger;

export {
  Menubar,
  MenubarArrow,
  MenubarBackdrop,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarLinkItem,
  MenubarMenu,
  MenubarPortal,
  MenubarPopup,
  MenubarPositioner,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};

export type { MenubarArrowProps } from "./menubar-arrow";
export type { MenubarBackdropProps } from "./menubar-backdrop";
export type { MenubarCheckboxItemProps } from "./menubar-checkbox-item";
export type { MenubarContentProps } from "./menubar-content";
export type { MenubarGroupProps } from "./menubar-group";
export type { MenubarItemProps } from "./menubar-item";
export type { MenubarLabelProps } from "./menubar-label";
export type { MenubarLinkItemProps } from "./menubar-link-item";
export type { MenubarMenuProps } from "./menubar-menu";
export type { MenubarPopupProps } from "./menubar-popup";
export type { MenubarPortalProps } from "./menubar-portal";
export type { MenubarPositionerProps } from "./menubar-positioner";
export type { MenubarRadioGroupProps } from "./menubar-radio-group";
export type { MenubarRadioItemProps } from "./menubar-radio-item";
export type { MenubarSeparatorProps } from "./menubar-separator";
export type { MenubarShortcutProps } from "./menubar-shortcut";
export type { MenubarSubProps } from "./menubar-sub";
export type { MenubarSubContentProps } from "./menubar-sub-content";
export type { MenubarSubTriggerProps } from "./menubar-sub-trigger";
export type { MenubarTriggerProps } from "./menubar-trigger";
