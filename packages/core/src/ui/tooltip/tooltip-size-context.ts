import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type TooltipSize = UISize;

const {
  SizeContext: TooltipSizeContext,
  useResolvedSize: useResolvedTooltipSize,
} = createSizeContext();

export { TooltipSizeContext, useResolvedTooltipSize };
