"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { Children, isValidElement } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ScrollBar } from "./scroll-bar";
import { ScrollAreaContent } from "./scroll-content";
import { ScrollAreaCorner } from "./scroll-corner";
import { ScrollAreaThumb } from "./scroll-thumb";
import { ScrollAreaViewport } from "./scroll-viewport";
export type ScrollAreaProps = ScrollAreaPrimitive.Root.Props;

const ScrollArea = ({ className, children, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Root.State>(
      "relative",
      className
    )}
    data-slot="scroll-area"
    {...props}
  >
    {Children.toArray(children).some((child) => {
      if (!isValidElement(child)) {
        return false;
      }
      return (
        child.type === ScrollAreaPrimitive.Viewport ||
        child.type === ScrollAreaViewport
      );
    }) ? (
      children
    ) : (
      <>
        <ScrollAreaViewport>
          <ScrollAreaContent>{children}</ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollBar />
        <ScrollAreaCorner />
      </>
    )}
  </ScrollAreaPrimitive.Root>
);

ScrollArea.Bar = ScrollBar;
ScrollArea.Content = ScrollAreaContent;
ScrollArea.Corner = ScrollAreaCorner;
ScrollArea.Scrollbar = ScrollBar;
ScrollArea.Thumb = ScrollAreaThumb;
ScrollArea.Viewport = ScrollAreaViewport;

export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollBar,
};

export type { ScrollBarProps } from "./scroll-bar";
export type { ScrollAreaContentProps } from "./scroll-content";
export type { ScrollAreaCornerProps } from "./scroll-corner";
export type { ScrollAreaThumbProps } from "./scroll-thumb";
export type { ScrollAreaViewportProps } from "./scroll-viewport";
