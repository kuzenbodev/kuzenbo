"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { CollapsibleContent } from "./collapsible-content";
import { CollapsibleTrigger } from "./collapsible-trigger";
export type CollapsibleProps = CollapsiblePrimitive.Root.Props;

const Collapsible = ({ className, ...props }: CollapsibleProps) => (
  <CollapsiblePrimitive.Root
    className={mergeBaseUIClassName<CollapsiblePrimitive.Root.State>(
      "flex flex-col",
      className
    )}
    data-slot="collapsible"
    {...props}
  />
);

Collapsible.Content = CollapsibleContent;
Collapsible.Trigger = CollapsibleTrigger;

export { Collapsible, CollapsibleContent, CollapsibleTrigger };

export type { CollapsibleContentProps } from "./collapsible-content";
export type { CollapsibleTriggerProps } from "./collapsible-trigger";
