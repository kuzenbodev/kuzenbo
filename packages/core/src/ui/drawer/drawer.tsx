"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";

import { useComponentSize } from "../shared/size/size-provider";
import { DrawerActions } from "./drawer-actions";
import { DrawerBackdrop } from "./drawer-backdrop";
import { DrawerClose } from "./drawer-close";
import { DrawerContent } from "./drawer-content";
import { DrawerDescription } from "./drawer-description";
import { DrawerHandle } from "./drawer-handle";
import { DrawerHeader } from "./drawer-header";
import { DrawerIndent } from "./drawer-indent";
import { DrawerIndentBackground } from "./drawer-indent-background";
import { DrawerPopup } from "./drawer-popup";
import { DrawerPortal } from "./drawer-portal";
import { DrawerProvider } from "./drawer-provider";
import { DrawerSizeContext, type DrawerSize } from "./drawer-size-context";
import { DrawerTitle } from "./drawer-title";
import { DrawerTrigger } from "./drawer-trigger";
import { DrawerViewport } from "./drawer-viewport";

export type DrawerRootProps<T = unknown> = DrawerPrimitive.Root.Props<T> & {
  size?: DrawerSize;
};
export type DrawerProps<T = unknown> = DrawerRootProps<T>;

const Drawer = <T,>({ size: providedSize, ...props }: DrawerRootProps<T>) => {
  const size = useComponentSize(providedSize);

  return (
    <DrawerSizeContext.Provider value={{ size }}>
      <DrawerPrimitive.Root {...props} />
    </DrawerSizeContext.Provider>
  );
};

const DrawerRoot = Drawer;

Drawer.Root = DrawerRoot;
Drawer.Actions = DrawerActions;
Drawer.Backdrop = DrawerBackdrop;
Drawer.Close = DrawerClose;
Drawer.Content = DrawerContent;
Drawer.Description = DrawerDescription;
Drawer.Indent = DrawerIndent;
Drawer.IndentBackground = DrawerIndentBackground;
Drawer.Handle = DrawerHandle;
Drawer.Header = DrawerHeader;
Drawer.Popup = DrawerPopup;
Drawer.Portal = DrawerPortal;
Drawer.Provider = DrawerProvider;
Drawer.Title = DrawerTitle;
Drawer.Trigger = DrawerTrigger;
Drawer.Viewport = DrawerViewport;
Drawer.createHandle = DrawerPrimitive.createHandle;

const createDrawerHandle = DrawerPrimitive.createHandle;

export type { DrawerActionsProps } from "./drawer-actions";
export type { DrawerBackdropProps } from "./drawer-backdrop";
export type { DrawerCloseProps } from "./drawer-close";
export type { DrawerContentProps } from "./drawer-content";
export type { DrawerDescriptionProps } from "./drawer-description";
export type { DrawerHandleProps } from "./drawer-handle";
export type { DrawerHeaderProps } from "./drawer-header";
export type { DrawerIndentBackgroundProps } from "./drawer-indent-background";
export type { DrawerIndentProps } from "./drawer-indent";
export type { DrawerPopupProps } from "./drawer-popup";
export type { DrawerPopupSize } from "./drawer-popup";
export type { DrawerPortalProps } from "./drawer-portal";
export type { DrawerProviderProps } from "./drawer-provider";
export type { DrawerSize } from "./drawer-size-context";
export type { DrawerTitleProps } from "./drawer-title";
export type { DrawerTriggerProps } from "./drawer-trigger";
export type { DrawerViewportProps } from "./drawer-viewport";

export {
  Drawer,
  DrawerRoot,
  DrawerActions,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPopup,
  DrawerPortal,
  DrawerProvider,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
  createDrawerHandle,
};
