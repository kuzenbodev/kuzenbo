"use client";

import type { ComponentProps } from "react";

import { Separator } from "react-resizable-panels";
import { cn } from "tailwind-variants";
export type ResizableHandleProps = ComponentProps<typeof Separator> & {
  withHandle?: boolean;
};

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    data-slot="resizable-handle"
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
    )}
  </Separator>
);

export { ResizableHandle };
