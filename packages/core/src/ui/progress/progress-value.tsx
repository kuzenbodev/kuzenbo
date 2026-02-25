"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type ProgressValueProps = ProgressPrimitive.Value.Props;

const ProgressValue = ({ className, ...props }: ProgressValueProps) => (
  <ProgressPrimitive.Value
    className={mergeBaseUIClassName<ProgressPrimitive.Root.State>(
      "ml-auto text-sm text-muted-foreground tabular-nums",
      className
    )}
    data-slot="progress-value"
    {...props}
  />
);

export { ProgressValue };
