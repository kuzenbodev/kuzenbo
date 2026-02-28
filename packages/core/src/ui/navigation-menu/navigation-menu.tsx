"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { NavigationMenuArrow } from "./navigation-menu-arrow";
import { NavigationMenuBackdrop } from "./navigation-menu-backdrop";
import { NavigationMenuContent } from "./navigation-menu-content";
import { NavigationMenuContext } from "./navigation-menu-context";
import { NavigationMenuIndicator } from "./navigation-menu-indicator";
import { NavigationMenuItem } from "./navigation-menu-item";
import { NavigationMenuLink } from "./navigation-menu-link";
import { NavigationMenuList } from "./navigation-menu-list";
import { NavigationMenuOverlayContext } from "./navigation-menu-overlay-context";
import { NavigationMenuPopup } from "./navigation-menu-popup";
import { NavigationMenuPortal } from "./navigation-menu-portal";
import { NavigationMenuPositioner } from "./navigation-menu-positioner";
import { NavigationMenuTrigger } from "./navigation-menu-trigger";
import { NavigationMenuViewport } from "./navigation-menu-viewport";
export type NavigationMenuProps = NavigationMenuPrimitive.Root.Props & {
  size?: InputSize;
};

const NavigationMenu = ({
  className,
  children,
  size: providedSize,
  ...props
}: NavigationMenuProps) => {
  const size = useComponentSize(providedSize);
  const rootContextValue = useMemo(() => ({ size }), [size]);
  const overlayContextValue = useMemo(() => ({ size }), [size]);

  return (
    <NavigationMenuContext.Provider value={rootContextValue}>
      <NavigationMenuPrimitive.Root
        className={cn(
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
          className
        )}
        data-size={size}
        data-slot="navigation-menu"
        {...props}
      >
        <NavigationMenuOverlayContext.Provider value={overlayContextValue}>
          {children}
          <NavigationMenuPortal>
            <NavigationMenuPositioner>
              <NavigationMenuPopup size={size}>
                <NavigationMenuViewport />
              </NavigationMenuPopup>
            </NavigationMenuPositioner>
          </NavigationMenuPortal>
        </NavigationMenuOverlayContext.Provider>
      </NavigationMenuPrimitive.Root>
    </NavigationMenuContext.Provider>
  );
};

NavigationMenu.Arrow = NavigationMenuArrow;
NavigationMenu.Backdrop = NavigationMenuBackdrop;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Indicator = NavigationMenuIndicator;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Link = NavigationMenuLink;
NavigationMenu.List = NavigationMenuList;
NavigationMenu.Popup = NavigationMenuPopup;
NavigationMenu.Portal = NavigationMenuPortal;
NavigationMenu.Positioner = NavigationMenuPositioner;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Viewport = NavigationMenuViewport;

export {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuBackdrop,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
};

export type { NavigationMenuArrowProps } from "./navigation-menu-arrow";
export type { NavigationMenuBackdropProps } from "./navigation-menu-backdrop";
export type { NavigationMenuContentProps } from "./navigation-menu-content";
export type { NavigationMenuIndicatorProps } from "./navigation-menu-indicator";
export type { NavigationMenuItemProps } from "./navigation-menu-item";
export type { NavigationMenuLinkProps } from "./navigation-menu-link";
export type { NavigationMenuListProps } from "./navigation-menu-list";
export type { NavigationMenuPopupProps } from "./navigation-menu-popup";
export type { NavigationMenuPortalProps } from "./navigation-menu-portal";
export type { NavigationMenuPositionerProps } from "./navigation-menu-positioner";
export type { NavigationMenuTriggerProps } from "./navigation-menu-trigger";
export type { NavigationMenuViewportProps } from "./navigation-menu-viewport";
