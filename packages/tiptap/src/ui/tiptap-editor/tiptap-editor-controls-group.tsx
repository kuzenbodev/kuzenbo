"use client";

import type { ComponentProps } from "react";

import { Toolbar } from "@kuzenbo/core/ui/toolbar";
import { cn, tv } from "tailwind-variants";

import { useTiptapEditorContext } from "./tiptap-editor-context";

export type TiptapEditorControlsGroupProps = ComponentProps<
  typeof Toolbar.Group
>;

const tiptapEditorControlsGroupVariants = tv({
  base: "kb-tiptap-controls-group border border-border/80 bg-background/60",
  variants: {
    size: {
      xs: "gap-0.5 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "gap-0.5 p-0.5",
      md: "gap-1 rounded-md p-0.5",
      lg: "gap-1 rounded-md p-1",
      xl: "gap-1.5 rounded-lg p-1",
    },
    subtle: {
      true: "border-transparent bg-transparent p-0",
    },
  },
});

export const TiptapEditorControlsGroup = ({
  children,
  className,
  ...props
}: TiptapEditorControlsGroupProps) => {
  const context = useTiptapEditorContext();

  return (
    <Toolbar.Group
      className={tiptapEditorControlsGroupVariants({
        size: context.size,
        subtle: context.variant === "subtle",
        className: cn(context.classNames?.group, className),
      })}
      data-size={context.size}
      {...props}
    >
      {children}
    </Toolbar.Group>
  );
};
