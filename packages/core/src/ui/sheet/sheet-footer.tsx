import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type SheetFooterProps = ComponentProps<"div">;

const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    data-slot="sheet-footer"
    {...props}
  />
);

export { SheetFooter };
