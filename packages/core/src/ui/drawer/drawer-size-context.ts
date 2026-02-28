import { createSizeContext } from "../shared/size/size-context";
import type { UISize } from "../shared/size/size-system";

export type DrawerSize = UISize;

const {
  SizeContext: DrawerSizeContext,
  useResolvedSize: useResolvedDrawerSize,
} = createSizeContext();

export { DrawerSizeContext, useResolvedDrawerSize };
