"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;

const CollapsibleTrigger = ({
  className,
  ...props
}: CollapsibleTriggerProps) => (
  <CollapsiblePrimitive.Trigger
    className={mergeBaseUIClassName<CollapsiblePrimitive.Root.State>(
      "cursor-pointer",
      className
    )}
    data-slot="collapsible-trigger"
    {...props}
  />
);

export { CollapsibleTrigger };
