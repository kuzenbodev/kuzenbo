"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

const tableRowVariants = tv({
  base: "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TableRowProps = ComponentProps<"tr"> &
  VariantProps<typeof tableRowVariants> & {
    size?: UISize;
  };

const TableRow = ({ className, size, ...props }: TableRowProps) => {
  const resolvedSize = useTableResolvedSize(size);
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <TableSizeContext.Provider value={contextValue}>
      <tr
        className={cn(tableRowVariants({ size: resolvedSize }), className)}
        data-size={resolvedSize}
        data-slot="table-row"
        {...props}
      />
    </TableSizeContext.Provider>
  );
};

export { TableRow };
