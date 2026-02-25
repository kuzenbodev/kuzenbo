import { createSizeContext } from "../shared/size/size-context";

const {
  SizeContext: BreadcrumbSizeContext,
  useResolvedSize: useResolvedBreadcrumbSize,
} = createSizeContext();

export { BreadcrumbSizeContext, useResolvedBreadcrumbSize };
