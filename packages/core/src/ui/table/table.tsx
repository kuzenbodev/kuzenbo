"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { ScrollBar } from "../scroll-area/scroll-bar";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { TableBody } from "./table-body";
import { TableCaption } from "./table-caption";
import { TableCell } from "./table-cell";
import { TableFooter } from "./table-footer";
import { TableHead } from "./table-head";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { TableSizeContext } from "./table-size-context";

const tableVariants = tv({
  base: "w-full caption-bottom",
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

export type TableProps = ComponentProps<"table"> &
  VariantProps<typeof tableVariants> & {
    size?: UISize;
  };

const Table = ({ className, size: providedSize, ...props }: TableProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <TableSizeContext.Provider value={contextValue}>
      <ScrollAreaPrimitive.Root
        className="border-border bg-card relative w-full rounded-lg border"
        data-size={size}
        data-slot="table-container"
      >
        <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
          <table
            className={cn(tableVariants({ size }), className)}
            data-size={size}
            data-slot="table"
            {...props}
          />
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollBar orientation="horizontal" />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </TableSizeContext.Provider>
  );
};

Table.Body = TableBody;
Table.Caption = TableCaption;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};

export type { TableBodyProps } from "./table-body";
export type { TableCaptionProps } from "./table-caption";
export type { TableCellProps } from "./table-cell";
export type { TableFooterProps } from "./table-footer";
export type { TableHeadProps } from "./table-head";
export type { TableHeaderProps } from "./table-header";
export type { TableSize } from "./table-size-context";
export type { TableRowProps } from "./table-row";
