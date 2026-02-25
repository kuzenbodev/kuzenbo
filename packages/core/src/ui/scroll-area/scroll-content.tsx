import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ScrollAreaContentProps = ScrollAreaPrimitive.Content.Props;

const ScrollAreaContent = ({ className, ...props }: ScrollAreaContentProps) => (
  <ScrollAreaPrimitive.Content
    className={mergeBaseUIClassName<ScrollAreaPrimitive.Content.State>(
      undefined,
      className
    )}
    data-slot="scroll-area-content"
    {...props}
  />
);

export { ScrollAreaContent };
