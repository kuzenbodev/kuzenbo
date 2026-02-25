import type { ColumnDef } from "@tanstack/react-table";

export const createMockColumns = <TData extends object>(
  columns: ColumnDef<TData>[]
): ColumnDef<TData>[] => columns;
