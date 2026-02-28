import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Separator } from "../separator/separator";
export type ItemSeparatorProps = ComponentProps<typeof Separator>;

const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => (
  <Separator
    className={cn("my-2", className)}
    data-slot="item-separator"
    orientation="horizontal"
    {...props}
  />
);

export { ItemSeparator };
