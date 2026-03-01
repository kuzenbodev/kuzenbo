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

type DrawerActionSheetRootProps<T = unknown> = Omit<
  DrawerPrimitive.Root.Props<T>,
  "children" | "swipeDirection"
> & {
  size?: DrawerSize;
};

export type DrawerActionSheetProps<T = unknown> =
  DrawerActionSheetRootProps<T> & {
    backdropProps?: DrawerBackdropProps;
    children: ReactNode;
    contentProps?: DrawerContentProps;
    destructiveAction?: ReactNode;
    popupProps?: DrawerPopupProps;
    portalProps?: DrawerPortalProps;
    trigger?: ReactNode;
    triggerProps?: Omit<DrawerTriggerProps, "children">;
    viewportProps?: DrawerViewportProps;
  };

const DrawerActionSheet = <T,>({
  backdropProps,
  children,
  contentProps,
  destructiveAction,
  popupProps,
  portalProps,
  size: providedSize,
  trigger,
  triggerProps,
  viewportProps,
  ...rootProps
}: DrawerActionSheetProps<T>) => {
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
            className={cn("[--backdrop-opacity:0.4]", backdropClassName)}
            {...resolvedBackdropProps}
          />
          <DrawerViewport
            className={cn(
              "fixed inset-0 flex items-end justify-center",
              viewportClassName
            )}
            {...resolvedViewportProps}
          >
            <DrawerPopup
              className={cn(
                "pointer-events-none box-border flex w-full max-w-[var(--kb-drawer-action-sheet-max-width,28rem)] [transform:translateY(var(--drawer-swipe-movement-y))] flex-col gap-3 px-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] outline-none focus-visible:outline-none data-[ending-style]:[transform:translateY(calc(100%+1rem))] data-[ending-style]:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-[starting-style]:[transform:translateY(calc(100%+1rem))] data-[swiping]:select-none",
                popupClassName
              )}
              {...resolvedPopupProps}
            >
              <DrawerContent
                className={cn(
                  "bg-card text-card-foreground outline-border pointer-events-auto overflow-hidden rounded-2xl outline-1",
                  contentClassName
                )}
                {...resolvedContentProps}
              >
                {children}
              </DrawerContent>
              {destructiveAction ? (
                <div className="bg-card text-card-foreground outline-border pointer-events-auto overflow-hidden rounded-2xl outline-1">
                  {destructiveAction}
                </div>
              ) : null}
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </DrawerPrimitive.Root>
    </DrawerSizeContext.Provider>
  );
};

export { DrawerActionSheet };
