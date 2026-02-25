"use client";

import type { ComponentProps } from "react";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

const tableFooterVariants = tv({
  base: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
      xl: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TableFooterProps = ComponentProps<"tfoot"> &
  VariantProps<typeof tableFooterVariants> & {
    size?: UISize;
  };

const TableFooter = ({ className, size, ...props }: TableFooterProps) => {
  const resolvedSize = useTableResolvedSize(size);

  return (
    <TableSizeContext.Provider value={{ size: resolvedSize }}>
      <tfoot
        className={cn(tableFooterVariants({ size: resolvedSize }), className)}
        data-size={resolvedSize}
        data-slot="table-footer"
        {...props}
      />
    </TableSizeContext.Provider>
  );
};

export { TableFooter };
