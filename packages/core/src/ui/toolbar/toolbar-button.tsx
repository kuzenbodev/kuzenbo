"use client";

import type { VariantProps } from "tailwind-variants";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { buttonVariants } from "../button/button";
import {
  useToolbarResolvedSize,
  type ToolbarSize,
} from "./toolbar-size-context";

type ToolbarButtonVariantProps = Omit<
  VariantProps<typeof buttonVariants>,
  "size"
>;

export type ToolbarButtonProps = ToolbarPrimitive.Button.Props &
  ToolbarButtonVariantProps & {
    size?: ToolbarSize;
  };

export const ToolbarButton = ({
  className,
  variant = "ghost",
  size,
  ...props
}: ToolbarButtonProps) => {
  const resolvedSize = useToolbarResolvedSize(size);

  return (
    <ToolbarPrimitive.Button
      className={mergeBaseUIClassName<ToolbarPrimitive.Button.State>(
        cn(
          buttonVariants({ variant, size: resolvedSize }),
          "shrink-0 cursor-clickable"
        ),
        className
      )}
      data-size={resolvedSize}
      data-slot="toolbar-button"
      {...props}
    />
  );
};
