"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useTabsStyleContext } from "./tabs-style-context";
export type TabsTriggerProps = TabsPrimitive.Tab.Props;

const tabsTriggerVariants = tv({
  base: "cursor-clickable text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-active:text-foreground relative inline-flex items-center justify-center gap-1.5 border border-transparent font-medium break-keep whitespace-nowrap transition-colors outline-none select-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  compoundVariants: [{ class: "min-w-0 flex-1", fullWidth: true }],
  defaultVariants: {
    fullWidth: false,
    size: "md",
    variant: "default",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "",
    },
    size: {
      lg: "h-9 px-3 text-sm",
      md: "h-8 px-2.5 text-sm",
      sm: "h-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      xl: "h-10 px-3.5 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "h-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
    },
    variant: {
      default: "rounded-md border-transparent",
      line: "rounded-none border-transparent focus-visible:rounded-sm data-[orientation=horizontal]:-mb-[2px] data-[orientation=vertical]:-ml-[2px]",
      pill: "data-active:text-foreground rounded-md border-transparent",
    },
  },
});

const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  const { size, variant, fullWidth } = useTabsStyleContext();

  return (
    <TabsPrimitive.Tab
      className={mergeBaseUIClassName<TabsPrimitive.Tab.State>(
        tabsTriggerVariants({ fullWidth, size, variant }),
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
};

export { TabsTrigger };
