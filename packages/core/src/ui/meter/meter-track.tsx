import { Meter as BaseMeter } from "@base-ui/react/meter";
import type { ComponentProps } from "react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type MeterTrackProps = ComponentProps<typeof BaseMeter.Track>;

export const MeterTrack = ({ className, ...props }: MeterTrackProps) => (
  <BaseMeter.Track
    className={mergeBaseUIClassName<BaseMeter.Root.State>(
      "h-2 w-full overflow-hidden rounded-xs bg-primary/20",
      className
    )}
    data-slot="meter-track"
    {...props}
  />
);
