import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type ToolbarSize = UISize;

const {
  SizeContext: ToolbarSizeContext,
  useResolvedSize: useToolbarResolvedSize,
} = createSizeContext();

export { ToolbarSizeContext, useToolbarResolvedSize };
