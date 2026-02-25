"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props;

const CollapsibleContent = ({
  className,
  ...props
}: CollapsibleContentProps) => (
  <CollapsiblePrimitive.Panel
    className={mergeBaseUIClassName<CollapsiblePrimitive.Panel.State>(
      "flex h-(--collapsible-panel-height) flex-col justify-end overflow-hidden transition-all duration-150 ease-out [&[hidden]:not([hidden='until-found'])]:hidden data-ending-style:h-0 data-starting-style:h-0",
      className
    )}
    data-slot="collapsible-content"
    {...props}
  />
);

export { CollapsibleContent };
