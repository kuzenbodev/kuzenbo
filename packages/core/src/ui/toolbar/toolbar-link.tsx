"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  useToolbarResolvedSize,
  type ToolbarSize,
} from "./toolbar-size-context";

const toolbarLinkVariants = tv({
  base: "inline-flex shrink-0 items-center gap-2 text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-9 rounded-lg px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "h-10 rounded-lg px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "h-11 rounded-lg px-5 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ToolbarLinkProps = ToolbarPrimitive.Link.Props &
  VariantProps<typeof toolbarLinkVariants> & {
    size?: ToolbarSize;
  };

const ToolbarLink = ({ className, size, ...props }: ToolbarLinkProps) => {
  const resolvedSize = useToolbarResolvedSize(size);

  return (
    <ToolbarPrimitive.Link
      className={mergeBaseUIClassName<ToolbarPrimitive.Link.State>(
        cn(toolbarLinkVariants({ size: resolvedSize })),
        className
      )}
      data-size={resolvedSize}
      data-slot="toolbar-link"
      {...props}
    />
  );
};

export { ToolbarLink, toolbarLinkVariants };
