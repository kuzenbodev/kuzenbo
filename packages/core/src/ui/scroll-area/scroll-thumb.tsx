import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ScrollAreaThumbProps = ScrollAreaPrimitive.Thumb.Props;

const ScrollAreaThumb = ({ className, ...props }: ScrollAreaThumbProps) => (
  <ScrollAreaPrimitive.Thumb
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Thumb.State>(
      "relative flex-1 rounded-full bg-border",
      className
    )}
    data-slot="scroll-area-thumb"
    {...props}
  />
);

export { ScrollAreaThumb };
