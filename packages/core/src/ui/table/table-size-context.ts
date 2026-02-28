import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type TableSize = UISize;

const { SizeContext: TableSizeContext, useResolvedSize: useTableResolvedSize } =
  createSizeContext();

export { TableSizeContext, useTableResolvedSize };
