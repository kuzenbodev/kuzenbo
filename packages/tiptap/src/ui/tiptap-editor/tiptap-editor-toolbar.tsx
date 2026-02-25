"use client";

import type { CSSProperties } from "react";

import { Toolbar, type ToolbarProps } from "@kuzenbo/core";
import { cn, tv } from "tailwind-variants";

import { useTiptapEditorContext } from "./tiptap-editor-context";
import {
  DEFAULT_TIPTAP_EDITOR_SIZE,
  type TiptapEditorSize,
} from "./tiptap-editor-size";

const tiptapEditorToolbarVariants = tv({
  base: "kb-tiptap-toolbar",
  variants: {
    size: {
      xs: "gap-0.5 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "gap-0.5 p-0.5",
      md: "gap-1 p-1",
      lg: "gap-1 p-1.5",
      xl: "gap-1.5 p-2",
    },
    sticky: {
      true: "sticky top-(--kb-tiptap-toolbar-offset) z-20",
    },
    subtle: {
      true: "bg-transparent p-0 shadow-none outline-none",
    },
  },
});

export interface TiptapEditorToolbarProps extends ToolbarProps {
  size?: TiptapEditorSize;
  sticky?: boolean;
  stickyOffset?: number | string;
}

export const TiptapEditorToolbar = ({
  children,
  className,
  size,
  sticky,
  stickyOffset = 0,
  style,
  ...props
}: TiptapEditorToolbarProps) => {
  const context = useTiptapEditorContext();
  const resolvedSize = size ?? context.size ?? DEFAULT_TIPTAP_EDITOR_SIZE;
  const stickyStyle = sticky ? ({ ...style } as CSSProperties) : style;

  if (sticky) {
    (
      stickyStyle as CSSProperties & Record<string, number | string | undefined>
    )["--kb-tiptap-toolbar-offset"] =
      typeof stickyOffset === "number" ? `${stickyOffset}px` : stickyOffset;
  }

  return (
    <Toolbar
      className={tiptapEditorToolbarVariants({
        size: resolvedSize,
        sticky: Boolean(sticky),
        subtle: context.variant === "subtle",
        className: cn(context.classNames?.toolbar, className),
      })}
      data-size={resolvedSize}
      style={stickyStyle}
      {...props}
    >
      {children}
    </Toolbar>
  );
};
