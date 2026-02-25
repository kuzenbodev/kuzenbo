import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ScrollAreaCornerProps = ScrollAreaPrimitive.Corner.Props;

const ScrollAreaCorner = ({ className, ...props }: ScrollAreaCornerProps) => (
  <ScrollAreaPrimitive.Corner
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Corner.State>(
      undefined,
      className
    )}
    data-slot="scroll-area-corner"
    {...props}
  />
);

export { ScrollAreaCorner };
