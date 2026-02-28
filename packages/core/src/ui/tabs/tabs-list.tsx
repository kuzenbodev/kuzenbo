"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { useMemo } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { TabsStyleContext, tabsStyleDefaults } from "./tabs-style-context";
import type { TabsListSize, TabsListVariant } from "./tabs-style-context";
export type TabsListProps = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants>;

const tabsListVariants = tv({
  base: "group/tabs-list z-base text-muted-foreground relative inline-flex items-center justify-start group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch",
  defaultVariants: {
    fullWidth: false,
    size: "md",
    variant: "default",
  },
  variants: {
    fullWidth: {
      false: "w-fit",
      true: "w-full",
    },
    size: {
      lg: "group-data-[orientation=horizontal]/tabs:min-h-9",
      md: "group-data-[orientation=horizontal]/tabs:min-h-8",
      sm: "group-data-[orientation=horizontal]/tabs:min-h-7",
      xl: "group-data-[orientation=horizontal]/tabs:min-h-10",
      xs: "group-data-[orientation=horizontal]/tabs:min-h-6",
    },
    variant: {
      default:
        "gap-1 px-1 group-data-[orientation=vertical]/tabs:px-0 group-data-[orientation=vertical]/tabs:py-1",
      line: "gap-1 group-data-[orientation=vertical]/tabs:border-b-0 group-data-[orientation=vertical]/tabs:border-l",
      pill: "bg-muted gap-1 rounded-md p-1",
    },
  },
});

const TabsList = ({
  className,
  variant = tabsStyleDefaults.variant,
  size = tabsStyleDefaults.size,
  fullWidth = tabsStyleDefaults.fullWidth,
  ...props
}: TabsListProps) => {
  const contextValue = useMemo(
    () => ({ fullWidth, size, variant }),
    [size, variant, fullWidth]
  );

  return (
    <TabsStyleContext.Provider value={contextValue}>
      <TabsPrimitive.List
        className={mergeBaseUIClassName<TabsPrimitive.List.State>(
          tabsListVariants({ fullWidth, size, variant }),
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
};

export { TabsList, tabsListVariants, type TabsListSize, type TabsListVariant };
