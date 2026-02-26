"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import { ToolbarButton } from "./toolbar-button";
import { ToolbarGroup } from "./toolbar-group";
import { ToolbarInput } from "./toolbar-input";
import { ToolbarLink } from "./toolbar-link";
import { ToolbarSeparator } from "./toolbar-separator";
import { ToolbarSizeContext, type ToolbarSize } from "./toolbar-size-context";

const toolbarVariants = tv({
  base: "flex items-center rounded-lg bg-popover shadow-xs outline outline-border",
  variants: {
    size: {
      xs: "gap-0.5 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "gap-0.5 rounded-[min(var(--radius-md),10px)] p-0.5",
      md: "gap-1 p-1",
      lg: "gap-1 p-1.5",
      xl: "gap-1.5 rounded-xl p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ToolbarProps = ToolbarPrimitive.Root.Props &
  VariantProps<typeof toolbarVariants> & {
    size?: ToolbarSize;
  };

const Toolbar = ({ className, size: providedSize, ...props }: ToolbarProps) => {
  const size = useComponentSize(providedSize);

  return (
    <ToolbarSizeContext.Provider value={{ size }}>
      <ToolbarPrimitive.Root
        className={mergeBaseUIClassName<ToolbarPrimitive.Root.State>(
          toolbarVariants({ size }),
          className
        )}
        data-size={size}
        data-slot="toolbar"
        {...props}
      />
    </ToolbarSizeContext.Provider>
  );
};

Toolbar.Button = ToolbarButton;
Toolbar.Group = ToolbarGroup;
Toolbar.Input = ToolbarInput;
Toolbar.Link = ToolbarLink;
Toolbar.Separator = ToolbarSeparator;

export type { ToolbarButtonProps } from "./toolbar-button";
export type { ToolbarGroupProps } from "./toolbar-group";
export type { ToolbarInputProps } from "./toolbar-input";
export type { ToolbarLinkProps } from "./toolbar-link";
export type { ToolbarSize } from "./toolbar-size-context";
export type { ToolbarSeparatorProps } from "./toolbar-separator";

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
};
