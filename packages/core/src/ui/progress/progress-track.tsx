"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ProgressTrackProps = ProgressPrimitive.Track.Props;

const ProgressTrack = ({ className, ...props }: ProgressTrackProps) => (
  <ProgressPrimitive.Track
    className={mergeBaseUIClassName<ProgressPrimitive.Root.State>(
      "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
      className
    )}
    data-slot="progress-track"
    {...props}
  />
);

export { ProgressTrack };
