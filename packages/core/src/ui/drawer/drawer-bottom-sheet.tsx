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
import { DrawerHandle } from "./drawer-handle";
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

type DrawerBottomSheetRootProps<T = unknown> = Omit<
  DrawerPrimitive.Root.Props<T>,
  "children" | "swipeDirection"
> & {
  size?: DrawerSize;
};

export type DrawerBottomSheetProps<T = unknown> =
  DrawerBottomSheetRootProps<T> & {
    backdropProps?: DrawerBackdropProps;
    children: ReactNode;
    contentProps?: DrawerContentProps;
    popupProps?: DrawerPopupProps;
    portalProps?: DrawerPortalProps;
    showHandle?: boolean;
    trigger?: ReactNode;
    triggerProps?: Omit<DrawerTriggerProps, "children">;
    viewportProps?: DrawerViewportProps;
  };

const DrawerBottomSheet = <T,>({
  backdropProps,
  children,
  contentProps,
  popupProps,
  portalProps,
  showHandle = true,
  size: providedSize,
  trigger,
  triggerProps,
  viewportProps,
  ...rootProps
}: DrawerBottomSheetProps<T>) => {
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
      <DrawerPrimitive.Root swipeDirection="down" {...rootProps}>
        {trigger ? (
          <DrawerTrigger {...triggerProps}>{trigger}</DrawerTrigger>
        ) : null}
        <DrawerPortal {...portalProps}>
          <DrawerBackdrop
            className={backdropClassName}
            {...resolvedBackdropProps}
          />
          <DrawerViewport
            className={cn(
              "fixed inset-0 flex items-end justify-center",
              viewportClassName
            )}
            {...resolvedViewportProps}
          >
            <DrawerPopup className={popupClassName} {...resolvedPopupProps}>
              {showHandle ? <DrawerHandle /> : null}
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

export { DrawerBottomSheet };
