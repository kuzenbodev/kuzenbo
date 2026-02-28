"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

const tableFooterVariants = tv({
  base: "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
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
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <TableSizeContext.Provider value={contextValue}>
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
