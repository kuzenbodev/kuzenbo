"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  useToolbarResolvedSize,
  type ToolbarSize,
} from "./toolbar-size-context";

const toolbarInputVariants = tv({
  base: "border-input bg-input placeholder:text-muted-foreground hover:border-ring/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/50 w-full min-w-0 border transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
  variants: {
    size: {
      xs: "h-6 rounded-[min(var(--radius-md),8px)] px-2 text-xs",
      sm: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 text-sm",
      md: "h-9 rounded-md px-3 text-base md:text-sm",
      lg: "h-10 rounded-md px-3 text-base md:text-sm",
      xl: "h-11 rounded-md px-4 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type NativeToolbarInputProps = ToolbarPrimitive.Input.Props;
type NativeToolbarInputSize = NativeToolbarInputProps["size"];

export type ToolbarInputProps = Omit<NativeToolbarInputProps, "size"> &
  VariantProps<typeof toolbarInputVariants> & {
    size?: ToolbarSize;
    htmlSize?: NativeToolbarInputSize;
  };

const ToolbarInput = ({
  className,
  htmlSize,
  size,
  ...props
}: ToolbarInputProps) => {
  const resolvedSize = useToolbarResolvedSize(size);

  return (
    <ToolbarPrimitive.Input
      className={mergeBaseUIClassName<ToolbarPrimitive.Input.State>(
        cn(toolbarInputVariants({ size: resolvedSize })),
        className
      )}
      data-size={resolvedSize}
      data-slot="toolbar-input"
      size={htmlSize}
      {...props}
    />
  );
};

export { ToolbarInput, toolbarInputVariants };
