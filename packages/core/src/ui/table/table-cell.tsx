"use client";

import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useTableResolvedSize } from "./table-size-context";

const tableCellVariants = tv({
  base: "align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
  variants: {
    size: {
      xs: "px-1.5 py-1 text-xs",
      sm: "px-2 py-1.5 text-xs",
      md: "p-2 text-sm",
      lg: "px-2.5 py-2 text-sm",
      xl: "px-3 py-2.5 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TableCellProps = ComponentProps<"td"> &
  VariantProps<typeof tableCellVariants> & {
    size?: UISize;
  };

const TableCell = ({ className, size, ...props }: TableCellProps) => {
  const resolvedSize = useTableResolvedSize(size);

  return (
    <td
      className={cn(tableCellVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="table-cell"
      {...props}
    />
  );
};

export { TableCell, tableCellVariants };
