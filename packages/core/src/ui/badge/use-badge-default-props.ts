import type { BadgeProps } from "./badge";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useBadgeDefaultProps = (incomingProps: BadgeProps): BadgeProps =>
  useComponentDefaultProps<BadgeProps>("Badge", {}, incomingProps);
