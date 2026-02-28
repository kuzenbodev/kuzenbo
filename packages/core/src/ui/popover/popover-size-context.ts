import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type PopoverSize = UISize;

const {
  SizeContext: PopoverSizeContext,
  useResolvedSize: useResolvedPopoverSize,
} = createSizeContext();

export { PopoverSizeContext, useResolvedPopoverSize };
