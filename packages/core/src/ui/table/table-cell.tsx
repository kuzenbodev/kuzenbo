"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { useTableResolvedSize } from "./table-size-context";

const tableCellVariants = tv({
  base: "align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "px-2.5 py-2 text-sm",
      md: "p-2 text-sm",
      sm: "px-2 py-1.5 text-xs",
      xl: "px-3 py-2.5 text-base",
      xs: "px-1.5 py-1 text-xs",
    },
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
