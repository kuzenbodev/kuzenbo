"use client";

import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import { TableSizeContext, useTableResolvedSize } from "./table-size-context";

export type TableBodyProps = ComponentProps<"tbody"> & {
  size?: UISize;
};

const TableBody = ({ className, size, ...props }: TableBodyProps) => {
  const resolvedSize = useTableResolvedSize(size);

  return (
    <TableSizeContext.Provider value={{ size: resolvedSize }}>
      <tbody
        className={cn("[&_tr:last-child]:border-0", className)}
        data-size={resolvedSize}
        data-slot="table-body"
        {...props}
      />
    </TableSizeContext.Provider>
  );
};

export { TableBody };
