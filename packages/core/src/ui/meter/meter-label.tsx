import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type MeterLabelProps = ComponentProps<typeof BaseMeter.Label>;

export const MeterLabel = ({ className, ...props }: MeterLabelProps) => (
  <BaseMeter.Label
    className={mergeBaseUIClassName<BaseMeter.Root.State>(
      "text-sm font-medium",
      className
    )}
    data-slot="meter-label"
    {...props}
  />
);
