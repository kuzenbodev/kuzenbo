"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  ToolbarSizeContext,
  useToolbarResolvedSize,
  type ToolbarSize,
} from "./toolbar-size-context";

const toolbarGroupVariants = tv({
  base: "flex items-center",
  variants: {
    size: {
      xs: "gap-0.5",
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1",
      xl: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
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
