"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  TabsStyleContext,
  tabsStyleDefaults,
  type TabsListSize,
  type TabsListVariant,
} from "./tabs-style-context";
export type TabsListProps = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants>;

const tabsListVariants = tv({
  base: "group/tabs-list relative z-0 inline-flex items-center justify-start text-muted-foreground group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch",
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    },
    variant: {
      default:
        "gap-1 px-1 group-data-[orientation=vertical]/tabs:px-0 group-data-[orientation=vertical]/tabs:py-1",
      line: "gap-1 group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-l",
      pill: "gap-1 rounded-md bg-muted p-1",
    },
    size: {
      xs: "group-data-[orientation=horizontal]/tabs:min-h-6",
      sm: "group-data-[orientation=horizontal]/tabs:min-h-7",
      md: "group-data-[orientation=horizontal]/tabs:min-h-8",
      lg: "group-data-[orientation=horizontal]/tabs:min-h-9",
      xl: "group-data-[orientation=horizontal]/tabs:min-h-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    fullWidth: false,
  },
});

const TabsList = ({
  className,
  variant = tabsStyleDefaults.variant,
  size = tabsStyleDefaults.size,
  fullWidth = tabsStyleDefaults.fullWidth,
  ...props
}: TabsListProps) => (
  <TabsStyleContext.Provider
    value={{
      size,
      variant,
      fullWidth,
    }}
  >
    <TabsPrimitive.List
      className={mergeBaseUIClassName<TabsPrimitive.List.State>(
        tabsListVariants({ size, variant, fullWidth }),
        className
      )}
      data-size={size}
      data-slot="tabs-list"
      data-variant={variant}
      data-full-width={fullWidth}
      {...props}
    />
  </TabsStyleContext.Provider>
);

export { TabsList, tabsListVariants, type TabsListSize, type TabsListVariant };
