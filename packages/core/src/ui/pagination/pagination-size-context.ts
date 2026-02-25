import { createSizeContext } from "../shared/size/size-context";

const {
  SizeContext: PaginationSizeContext,
  useResolvedSize: useResolvedPaginationSize,
} = createSizeContext();

export { PaginationSizeContext, useResolvedPaginationSize };
