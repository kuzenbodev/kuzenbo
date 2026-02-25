"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { TabsContent } from "./tabs-content";
import { TabsIndicator } from "./tabs-indicator";
import { TabsList } from "./tabs-list";
import { TabsTrigger } from "./tabs-trigger";
export type TabsProps = TabsPrimitive.Root.Props;

const Tabs = ({
  className,
  orientation = "horizontal",
  ...props
}: TabsProps) => (
  <TabsPrimitive.Root
    className={mergeBaseUIClassName<TabsPrimitive.Root.State>(
      "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
      className
    )}
    data-slot="tabs"
    orientation={orientation}
    {...props}
  />
);

Tabs.Content = TabsContent;
Tabs.Indicator = TabsIndicator;
Tabs.List = TabsList;
Tabs.Panel = TabsContent;
Tabs.Tab = TabsTrigger;
Tabs.Trigger = TabsTrigger;

export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };

export type { TabsContentProps } from "./tabs-content";
export type { TabsIndicatorProps } from "./tabs-indicator";
export type { TabsListProps } from "./tabs-list";
export type { TabsTriggerProps } from "./tabs-trigger";
