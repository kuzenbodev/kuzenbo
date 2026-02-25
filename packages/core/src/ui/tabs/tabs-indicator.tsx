"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useTabsStyleContext } from "./tabs-style-context";
export type TabsIndicatorProps = TabsPrimitive.Indicator.Props;

const tabsIndicatorVariants = tv({
  base: "pointer-events-none absolute top-0 left-0 z-[-1] h-[var(--active-tab-height)] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)] transition-[translate,width,height,opacity] duration-200 ease-in-out",
  variants: {
    variant: {
      default: "bg-muted",
      line: "bg-primary group-data-[orientation=horizontal]/tabs:h-[2px] group-data-[orientation=horizontal]/tabs:w-[var(--active-tab-width)] group-data-[orientation=horizontal]/tabs:translate-x-[var(--active-tab-left)] group-data-[orientation=horizontal]/tabs:translate-y-[calc(var(--active-tab-top)+var(--active-tab-height)-2px)] group-data-[orientation=vertical]/tabs:h-[var(--active-tab-height)] group-data-[orientation=vertical]/tabs:w-[2px] group-data-[orientation=vertical]/tabs:translate-x-[var(--active-tab-left)] group-data-[orientation=vertical]/tabs:translate-y-[var(--active-tab-top)]",
      pill: "bg-background shadow-sm",
    },
    size: {
      xs: "rounded-[min(var(--radius-md),8px)]",
      sm: "rounded-[min(var(--radius-md),8px)]",
      md: "rounded-[min(var(--radius-md),10px)]",
      lg: "rounded-[var(--radius-md)]",
      xl: "rounded-[var(--radius-md)]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const TabsIndicator = ({ className, ...props }: TabsIndicatorProps) => {
  const { size, variant } = useTabsStyleContext();

  return (
    <TabsPrimitive.Indicator
      className={mergeBaseUIClassName<TabsPrimitive.Indicator.State>(
        tabsIndicatorVariants({ size, variant }),
        className
      )}
      data-slot="tabs-indicator"
      renderBeforeHydration
      {...props}
    />
  );
};

export { TabsIndicator };
