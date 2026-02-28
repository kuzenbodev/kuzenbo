"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useToolbarResolvedSize } from "./toolbar-size-context";
import type { ToolbarSize } from "./toolbar-size-context";

const toolbarSeparatorVariants = tv({
  base: "bg-border w-px shrink-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-7",
      md: "h-6",
      sm: "h-5",
      xl: "h-8",
      xs: "h-4",
    },
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
