import type { UISize } from "../shared/size/size-system";

import { createSizeContext } from "../shared/size/size-context";

export type TooltipSize = UISize;

const {
  SizeContext: TooltipSizeContext,
  useResolvedSize: useResolvedTooltipSize,
} = createSizeContext();

export { TooltipSizeContext, useResolvedTooltipSize };
