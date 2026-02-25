"use client";

import type { ComponentProps } from "react";

import { Group } from "react-resizable-panels";
import { cn } from "tailwind-variants";

import { ResizableHandle } from "./resizable-handle";
import { ResizablePanel } from "./resizable-panel";
export type ResizablePanelGroupProps = ComponentProps<typeof Group>;

const ResizablePanelGroup = ({
  className,
  ...props
}: ResizablePanelGroupProps) => (
  <Group
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    data-slot="resizable-panel-group"
    {...props}
  />
);

ResizablePanelGroup.Handle = ResizableHandle;
ResizablePanelGroup.Panel = ResizablePanel;

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };

export type { ResizableHandleProps } from "./resizable-handle";
export type { ResizablePanelProps } from "./resizable-panel";
