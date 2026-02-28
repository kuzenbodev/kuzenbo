"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  useToolbarResolvedSize,
  type ToolbarSize,
} from "./toolbar-size-context";

const toolbarSeparatorVariants = tv({
  base: "bg-border w-px shrink-0",
  variants: {
    size: {
      xs: "h-4",
      sm: "h-5",
      md: "h-6",
      lg: "h-7",
      xl: "h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ToolbarSeparatorProps = ToolbarPrimitive.Separator.Props &
  VariantProps<typeof toolbarSeparatorVariants> & {
    size?: ToolbarSize;
  };

const ToolbarSeparator = ({
  className,
  size,
  ...props
}: ToolbarSeparatorProps) => {
  const resolvedSize = useToolbarResolvedSize(size);

  return (
    <ToolbarPrimitive.Separator
      className={mergeBaseUIClassName(
        cn(toolbarSeparatorVariants({ size: resolvedSize })),
        className
      )}
      data-size={resolvedSize}
      data-slot="toolbar-separator"
      {...props}
    />
  );
};

export { ToolbarSeparator, toolbarSeparatorVariants };
