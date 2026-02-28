"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useMemo } from "react";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { ContextMenuArrow } from "./context-menu-arrow";
import { ContextMenuBackdrop } from "./context-menu-backdrop";
import { ContextMenuCheckboxItem } from "./context-menu-checkbox-item";
import { ContextMenuContent } from "./context-menu-content";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuGroup } from "./context-menu-group";
import { ContextMenuItem } from "./context-menu-item";
import { ContextMenuLabel } from "./context-menu-label";
import { ContextMenuLinkItem } from "./context-menu-link-item";
import { ContextMenuPopup } from "./context-menu-popup";
import { ContextMenuPortal } from "./context-menu-portal";
import { ContextMenuPositioner } from "./context-menu-positioner";
import { ContextMenuRadioGroup } from "./context-menu-radio-group";
import { ContextMenuRadioItem } from "./context-menu-radio-item";
import { ContextMenuSeparator } from "./context-menu-separator";
import { ContextMenuShortcut } from "./context-menu-shortcut";
import { ContextMenuSub } from "./context-menu-sub";
import { ContextMenuSubContent } from "./context-menu-sub-content";
import { ContextMenuSubTrigger } from "./context-menu-sub-trigger";
import { ContextMenuTrigger } from "./context-menu-trigger";
export type ContextMenuProps = ContextMenuPrimitive.Root.Props & {
  size?: InputSize;
};

const ContextMenu = ({ size: providedSize, ...props }: ContextMenuProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <ContextMenuPrimitive.Root
        data-size={size}
        data-slot="context-menu"
        {...props}
      />
    </ContextMenuContext.Provider>
  );
};

ContextMenu.Arrow = ContextMenuArrow;
ContextMenu.Backdrop = ContextMenuBackdrop;
ContextMenu.CheckboxItem = ContextMenuCheckboxItem;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Group = ContextMenuGroup;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Label = ContextMenuLabel;
ContextMenu.LinkItem = ContextMenuLinkItem;
ContextMenu.Portal = ContextMenuPortal;
ContextMenu.Popup = ContextMenuPopup;
ContextMenu.Positioner = ContextMenuPositioner;
ContextMenu.RadioGroup = ContextMenuRadioGroup;
ContextMenu.RadioItem = ContextMenuRadioItem;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Shortcut = ContextMenuShortcut;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.SubContent = ContextMenuSubContent;
ContextMenu.SubTrigger = ContextMenuSubTrigger;
ContextMenu.Trigger = ContextMenuTrigger;

export {
  ContextMenu,
  ContextMenuArrow,
  ContextMenuBackdrop,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuLinkItem,
  ContextMenuPortal,
  ContextMenuPopup,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

export type { ContextMenuArrowProps } from "./context-menu-arrow";
export type { ContextMenuBackdropProps } from "./context-menu-backdrop";
export type { ContextMenuCheckboxItemProps } from "./context-menu-checkbox-item";
export type { ContextMenuContentProps } from "./context-menu-content";
export type { ContextMenuGroupProps } from "./context-menu-group";
export type { ContextMenuItemProps } from "./context-menu-item";
export type { ContextMenuLabelProps } from "./context-menu-label";
export type { ContextMenuLinkItemProps } from "./context-menu-link-item";
export type { ContextMenuPopupProps } from "./context-menu-popup";
export type { ContextMenuPortalProps } from "./context-menu-portal";
export type { ContextMenuPositionerProps } from "./context-menu-positioner";
export type { ContextMenuRadioGroupProps } from "./context-menu-radio-group";
export type { ContextMenuRadioItemProps } from "./context-menu-radio-item";
export type { ContextMenuSeparatorProps } from "./context-menu-separator";
export type { ContextMenuShortcutProps } from "./context-menu-shortcut";
export type { ContextMenuSubProps } from "./context-menu-sub";
export type { ContextMenuSubContentProps } from "./context-menu-sub-content";
export type { ContextMenuSubTriggerProps } from "./context-menu-sub-trigger";
export type { ContextMenuTriggerProps } from "./context-menu-trigger";
