"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ProgressLabelProps = ProgressPrimitive.Label.Props;

const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => (
  <ProgressPrimitive.Label
    className={mergeBaseUIClassName<ProgressPrimitive.Root.State>(
      "text-sm font-medium",
      className
    )}
    data-slot="progress-label"
    {...props}
  />
);

export { ProgressLabel };
