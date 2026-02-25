import type { UISize } from "../shared/size/size-system";

import { createSizeContext } from "../shared/size/size-context";

export type DrawerSize = UISize;

const {
  SizeContext: DrawerSizeContext,
  useResolvedSize: useResolvedDrawerSize,
} = createSizeContext();

export { DrawerSizeContext, useResolvedDrawerSize };
