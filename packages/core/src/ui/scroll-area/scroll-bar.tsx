import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { cn } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ScrollAreaThumb } from "./scroll-thumb";
export type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props;

const ScrollBar = ({
  className,
  orientation = "vertical",
  children,
  ...props
}: ScrollBarProps) => (
  <ScrollAreaPrimitive.Scrollbar
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Scrollbar.State>(
      cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent"
      ),
      className
    )}
    data-orientation={orientation}
    data-slot="scroll-area-scrollbar"
    orientation={orientation}
    {...props}
  >
    {children ?? <ScrollAreaThumb />}
  </ScrollAreaPrimitive.Scrollbar>
);

export { ScrollBar };
