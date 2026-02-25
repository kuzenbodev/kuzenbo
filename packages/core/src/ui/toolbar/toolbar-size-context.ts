import type { UISize } from "../shared/size/size-system";

import { createSizeContext } from "../shared/size/size-context";

export type ToolbarSize = UISize;

const {
  SizeContext: ToolbarSizeContext,
  useResolvedSize: useToolbarResolvedSize,
} = createSizeContext();

export { ToolbarSizeContext, useToolbarResolvedSize };
