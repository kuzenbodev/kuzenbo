"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useMemo } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  ToolbarSizeContext,
  useToolbarResolvedSize,
} from "./toolbar-size-context";
import type { ToolbarSize } from "./toolbar-size-context";

const toolbarGroupVariants = tv({
  base: "flex items-center",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-1",
      md: "gap-1",
      sm: "gap-0.5",
      xl: "gap-1.5",
      xs: "gap-0.5",
    },
  },
});

export type ToolbarGroupProps = ToolbarPrimitive.Group.Props &
  VariantProps<typeof toolbarGroupVariants> & {
    size?: ToolbarSize;
  };

const ToolbarGroup = ({ className, size, ...props }: ToolbarGroupProps) => {
  const resolvedSize = useToolbarResolvedSize(size);
  const contextValue = useMemo(() => ({ size: resolvedSize }), [resolvedSize]);

  return (
    <ToolbarSizeContext.Provider value={contextValue}>
      <ToolbarPrimitive.Group
        className={mergeBaseUIClassName(
          cn(toolbarGroupVariants({ size: resolvedSize })),
          className
        )}
        data-size={resolvedSize}
        data-slot="toolbar-group"
        {...props}
      />
    </ToolbarSizeContext.Provider>
  );
};

export { ToolbarGroup, toolbarGroupVariants };
