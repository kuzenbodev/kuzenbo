"use client";

import type { ComponentProps } from "react";

import { Meter as BaseMeter } from "@base-ui/react/meter";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { MeterIndicator } from "./meter-indicator";
import { MeterLabel } from "./meter-label";
import { MeterTrack } from "./meter-track";
import { MeterValue } from "./meter-value";

export type MeterProps = ComponentProps<typeof BaseMeter.Root>;

const Meter = ({ className, children, ...props }: MeterProps) => (
  <BaseMeter.Root
    className={mergeBaseUIClassName<BaseMeter.Root.State>(
      "w-full space-y-1.5",
      className
    )}
    data-slot="meter"
    {...props}
  >
    {children}
    <MeterTrack>
      <MeterIndicator />
    </MeterTrack>
  </BaseMeter.Root>
);

Meter.Indicator = MeterIndicator;
Meter.Label = MeterLabel;
Meter.Track = MeterTrack;
Meter.Value = MeterValue;

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };

export type { MeterIndicatorProps } from "./meter-indicator";
export type { MeterLabelProps } from "./meter-label";
export type { MeterTrackProps } from "./meter-track";
export type { MeterValueProps } from "./meter-value";
