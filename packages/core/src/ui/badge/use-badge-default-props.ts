import { useComponentDefaultProps } from "../shared/size/size-provider";
import type { BadgeProps } from "./badge";

export const useBadgeDefaultProps = (incomingProps: BadgeProps): BadgeProps =>
  useComponentDefaultProps<BadgeProps>("Badge", {}, incomingProps);
