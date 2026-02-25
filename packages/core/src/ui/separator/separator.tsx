import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type SeparatorProps = SeparatorPrimitive.Props;

const Separator = ({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive
    className={mergeBaseUIClassName<SeparatorPrimitive.State>(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
      className
    )}
    data-slot="separator"
    orientation={orientation}
    {...props}
  />
);

export { Separator };
