"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type TabsContentProps = TabsPrimitive.Panel.Props;

const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Panel
    className={mergeBaseUIClassName<TabsPrimitive.Panel.State>(
      "flex-1 text-sm outline-none focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-1px] focus-visible:outline-ring",
      className
    )}
    data-slot="tabs-content"
    {...props}
  />
);

export { TabsContent };
