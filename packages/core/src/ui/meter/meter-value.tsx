import type { ComponentProps } from "react";

import { Meter as BaseMeter } from "@base-ui/react/meter";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type MeterValueProps = ComponentProps<typeof BaseMeter.Value>;

export const MeterValue = ({ className, ...props }: MeterValueProps) => (
  <BaseMeter.Value
    className={mergeBaseUIClassName<BaseMeter.Root.State>("text-sm", className)}
    data-slot="meter-value"
    {...props}
  />
);
