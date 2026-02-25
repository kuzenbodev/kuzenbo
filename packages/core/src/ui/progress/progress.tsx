"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ProgressIndicator } from "./progress-indicator";
import { ProgressLabel } from "./progress-label";
import { ProgressTrack } from "./progress-track";
import { ProgressValue } from "./progress-value";
export type ProgressProps = ProgressPrimitive.Root.Props;

const Progress = ({ className, children, value, ...props }: ProgressProps) => (
  <ProgressPrimitive.Root
    className={mergeBaseUIClassName<ProgressPrimitive.Root.State>(
      "flex flex-wrap gap-3",
      className
    )}
    data-slot="progress"
    value={value}
    {...props}
  >
    {children}
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressPrimitive.Root>
);

Progress.Indicator = ProgressIndicator;
Progress.Label = ProgressLabel;
Progress.Track = ProgressTrack;
Progress.Value = ProgressValue;

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
};

export type { ProgressIndicatorProps } from "./progress-indicator";
export type { ProgressLabelProps } from "./progress-label";
export type { ProgressTrackProps } from "./progress-track";
export type { ProgressValueProps } from "./progress-value";
