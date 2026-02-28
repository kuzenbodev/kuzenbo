"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

const tableFooterVariants = tv({
  base: "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
      xl: "text-base",
      xs: "text-xs",
    },
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
