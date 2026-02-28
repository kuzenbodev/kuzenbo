"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn, tv } from "tailwind-variants";

export interface MockDataTableProps<TData extends object> {
  className?: string;
  columns: ColumnDef<TData>[];
  data: TData[];
}

const mockDataTableVariants = tv({
  slots: {
    root: "border-border rounded-lg border",
    table: "w-full border-collapse text-sm",
    thead: "border-border bg-muted/40 border-b",
    headerCell: "px-3 py-2 text-left font-medium",
    bodyRow: "border-border/60 border-b",
    bodyCell: "px-3 py-2",
  },
});

export const MockDataTable = <TData extends object>({
  className,
  columns,
  data,
}: MockDataTableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const styles = mockDataTableVariants();

  return (
    <div className={cn(styles.root(), className)}>
      <table className={styles.table()} data-slot="mock-data-table">
        <thead className={styles.thead()}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={styles.headerCell()} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className={styles.bodyRow()} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className={styles.bodyCell()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
