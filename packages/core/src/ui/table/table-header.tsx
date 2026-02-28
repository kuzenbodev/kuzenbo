"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

export type TableHeaderProps = ComponentProps<"thead"> & {
  size?: UISize;
};

const TableHeader = ({ className, size, ...props }: TableHeaderProps) => {
  const resolvedSize = useTableResolvedSize(size);
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <TableSizeContext.Provider value={contextValue}>
      <thead
        className={cn("[&_tr]:border-b", className)}
        data-size={resolvedSize}
        data-slot="table-header"
        {...props}
      />
    </TableSizeContext.Provider>
  );
};

export { TableHeader };
