import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ScrollAreaViewportProps = ScrollAreaPrimitive.Viewport.Props;

const ScrollAreaViewport = ({
  className,
  ...props
}: ScrollAreaViewportProps) => (
  <ScrollAreaPrimitive.Viewport
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Viewport.State>(
      "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
      className
    )}
    data-slot="scroll-area-viewport"
    {...props}
  />
);

export { ScrollAreaViewport };
