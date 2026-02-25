import type { UISize } from "../shared/size/size-system";

import { createSizeContext } from "../shared/size/size-context";

export type PopoverSize = UISize;

const {
  SizeContext: PopoverSizeContext,
  useResolvedSize: useResolvedPopoverSize,
} = createSizeContext();

export { PopoverSizeContext, useResolvedPopoverSize };
