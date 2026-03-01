"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import { useComponentSize } from "../shared/size/size-provider";
import { DrawerBackdrop } from "./drawer-backdrop";
import type { DrawerBackdropProps } from "./drawer-backdrop";
import { DrawerContent } from "./drawer-content";
import type { DrawerContentProps } from "./drawer-content";
import { DrawerPopup } from "./drawer-popup";
import type { DrawerPopupProps } from "./drawer-popup";
import { DrawerPortal } from "./drawer-portal";
import type { DrawerPortalProps } from "./drawer-portal";
import { DrawerSizeContext } from "./drawer-size-context";
import type { DrawerSize } from "./drawer-size-context";
import { DrawerTrigger } from "./drawer-trigger";
import type { DrawerTriggerProps } from "./drawer-trigger";
import { DrawerViewport } from "./drawer-viewport";
import type { DrawerViewportProps } from "./drawer-viewport";

type DrawerSidePanelRootProps<T = unknown> = Omit<
  DrawerPrimitive.Root.Props<T>,
  "children" | "swipeDirection"
> & {
  size?: DrawerSize;
};

type DrawerSidePanelSide = "left" | "right";

export type DrawerSidePanelProps<T = unknown> = DrawerSidePanelRootProps<T> & {
  backdropProps?: DrawerBackdropProps;
  children: ReactNode;
  contentProps?: DrawerContentProps;
  popupProps?: DrawerPopupProps;
  portalProps?: DrawerPortalProps;
  side?: DrawerSidePanelSide;
  trigger?: ReactNode;
  triggerProps?: Omit<DrawerTriggerProps, "children">;
  viewportProps?: DrawerViewportProps;
};

const DRAWER_SWIPE_DIRECTION_BY_SIDE = {
  left: "left",
  right: "right",
} as const;

const DrawerSidePanel = <T,>({
  backdropProps,
  children,
  contentProps,
  popupProps,
  portalProps,
  side = "right",
  size: providedSize,
  trigger,
  triggerProps,
  viewportProps,
  ...rootProps
}: DrawerSidePanelProps<T>) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  const { className: backdropClassName, ...resolvedBackdropProps } =
    backdropProps ?? {};
  const { className: contentClassName, ...resolvedContentProps } =
    contentProps ?? {};
  const { className: popupClassName, ...resolvedPopupProps } = popupProps ?? {};
  const { className: viewportClassName, ...resolvedViewportProps } =
    viewportProps ?? {};

  return (
    <DrawerSizeContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        swipeDirection={DRAWER_SWIPE_DIRECTION_BY_SIDE[side]}
        {...rootProps}
      >
        {trigger ? (
          <DrawerTrigger {...triggerProps}>{trigger}</DrawerTrigger>
        ) : null}
        <DrawerPortal {...portalProps}>
          <DrawerBackdrop
            className={backdropClassName}
            {...resolvedBackdropProps}
          />
          <DrawerViewport
            className={cn("fixed inset-0", viewportClassName)}
            {...resolvedViewportProps}
          >
            <DrawerPopup className={popupClassName} {...resolvedPopupProps}>
              <DrawerContent
                className={contentClassName}
                {...resolvedContentProps}
              >
                {children}
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </DrawerPrimitive.Root>
    </DrawerSizeContext.Provider>
  );
};

export { DrawerSidePanel };
