"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ProgressIndicatorProps = ProgressPrimitive.Indicator.Props;

const ProgressIndicator = ({ className, ...props }: ProgressIndicatorProps) => (
  <ProgressPrimitive.Indicator
    className={mergeBaseUIClassName<ProgressPrimitive.Root.State>(
      "h-full bg-primary transition-all",
      className
    )}
    data-slot="progress-indicator"
    {...props}
  />
);

export { ProgressIndicator };
