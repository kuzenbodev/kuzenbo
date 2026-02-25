import { createSizeContext } from "../shared/size/size-context";

const { SizeContext: EmptySizeContext, useResolvedSize: useResolvedEmptySize } =
  createSizeContext();

export { EmptySizeContext, useResolvedEmptySize };
