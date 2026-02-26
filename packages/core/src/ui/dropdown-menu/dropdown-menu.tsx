"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import type { InputSize } from "../input/input";

import { useComponentSize } from "../shared/size/size-provider";
import { DropdownMenuArrow } from "./dropdown-menu-arrow";
import { DropdownMenuBackdrop } from "./dropdown-menu-backdrop";
import { DropdownMenuCheckboxItem } from "./dropdown-menu-checkbox-item";
import { DropdownMenuContent } from "./dropdown-menu-content";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuGroup } from "./dropdown-menu-group";
import { DropdownMenuItem } from "./dropdown-menu-item";
import { DropdownMenuLabel } from "./dropdown-menu-label";
import { DropdownMenuLinkItem } from "./dropdown-menu-link-item";
import { DropdownMenuPopup } from "./dropdown-menu-popup";
import { DropdownMenuPortal } from "./dropdown-menu-portal";
import { DropdownMenuPositioner } from "./dropdown-menu-positioner";
import { DropdownMenuRadioGroup } from "./dropdown-menu-radio-group";
import { DropdownMenuRadioItem } from "./dropdown-menu-radio-item";
import { DropdownMenuSeparator } from "./dropdown-menu-separator";
import { DropdownMenuShortcut } from "./dropdown-menu-shortcut";
import { DropdownMenuSub } from "./dropdown-menu-sub";
import { DropdownMenuSubContent } from "./dropdown-menu-sub-content";
import { DropdownMenuSubTrigger } from "./dropdown-menu-sub-trigger";
import { DropdownMenuTrigger } from "./dropdown-menu-trigger";
export type DropdownMenuProps = MenuPrimitive.Root.Props & {
  size?: InputSize;
};

const DropdownMenu = ({ size: providedSize, ...props }: DropdownMenuProps) => {
  const size = useComponentSize(providedSize);

  return (
    <DropdownMenuContext.Provider value={{ size }}>
      <MenuPrimitive.Root
        data-size={size}
        data-slot="dropdown-menu"
        {...props}
      />
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.Arrow = DropdownMenuArrow;
DropdownMenu.Backdrop = DropdownMenuBackdrop;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.LinkItem = DropdownMenuLinkItem;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Popup = DropdownMenuPopup;
DropdownMenu.Positioner = DropdownMenuPositioner;
DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenu.RadioItem = DropdownMenuRadioItem;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Shortcut = DropdownMenuShortcut;
DropdownMenu.Sub = DropdownMenuSub;
DropdownMenu.SubContent = DropdownMenuSubContent;
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
DropdownMenu.Trigger = DropdownMenuTrigger;

export {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuBackdrop,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuPortal,
  DropdownMenuPopup,
  DropdownMenuPositioner,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};

export type { DropdownMenuArrowProps } from "./dropdown-menu-arrow";
export type { DropdownMenuBackdropProps } from "./dropdown-menu-backdrop";
export type { DropdownMenuCheckboxItemProps } from "./dropdown-menu-checkbox-item";
export type { DropdownMenuContentProps } from "./dropdown-menu-content";
export type { DropdownMenuGroupProps } from "./dropdown-menu-group";
export type { DropdownMenuItemProps } from "./dropdown-menu-item";
export type { DropdownMenuLabelProps } from "./dropdown-menu-label";
export type { DropdownMenuLinkItemProps } from "./dropdown-menu-link-item";
export type { DropdownMenuPopupProps } from "./dropdown-menu-popup";
export type { DropdownMenuPortalProps } from "./dropdown-menu-portal";
export type { DropdownMenuPositionerProps } from "./dropdown-menu-positioner";
export type { DropdownMenuRadioGroupProps } from "./dropdown-menu-radio-group";
export type { DropdownMenuRadioItemProps } from "./dropdown-menu-radio-item";
export type { DropdownMenuSeparatorProps } from "./dropdown-menu-separator";
export type { DropdownMenuShortcutProps } from "./dropdown-menu-shortcut";
export type { DropdownMenuSubProps } from "./dropdown-menu-sub";
export type { DropdownMenuSubContentProps } from "./dropdown-menu-sub-content";
export type { DropdownMenuSubTriggerProps } from "./dropdown-menu-sub-trigger";
export type { DropdownMenuTriggerProps } from "./dropdown-menu-trigger";
