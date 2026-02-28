"use client";

import type { ComponentProps } from "react";
import { Panel } from "react-resizable-panels";
export type ResizablePanelProps = ComponentProps<typeof Panel>;

const ResizablePanel = ({ ...props }: ResizablePanelProps) => (
  <Panel data-slot="resizable-panel" {...props} />
);

export { ResizablePanel };
