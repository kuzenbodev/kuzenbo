import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type MeterIndicatorProps = ComponentProps<typeof BaseMeter.Indicator>;

export const MeterIndicator = ({
  className,
  ...props
}: MeterIndicatorProps) => (
  <BaseMeter.Indicator
    className={mergeBaseUIClassName<BaseMeter.Root.State>(
      "bg-primary",
      className
    )}
    data-slot="meter-indicator"
    {...props}
  />
);
