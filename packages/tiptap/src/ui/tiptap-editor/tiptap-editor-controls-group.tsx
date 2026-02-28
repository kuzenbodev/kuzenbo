"use client";

import { Toolbar } from "@kuzenbo/core/ui/toolbar";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

import { useTiptapEditorContext } from "./tiptap-editor-context";

export type TiptapEditorControlsGroupProps = ComponentProps<
  typeof Toolbar.Group
>;

const tiptapEditorControlsGroupVariants = tv({
  base: "kb-tiptap-controls-group border-border/80 bg-background/60 border",
  variants: {
    size: {
      lg: "gap-1 rounded-md p-1",
      md: "gap-1 rounded-md p-0.5",
      sm: "gap-0.5 p-0.5",
      xl: "gap-1.5 rounded-lg p-1",
      xs: "gap-0.5 rounded-[min(var(--radius-md),8px)] p-0.5",
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
        className: cn(context.classNames?.group, className),
        size: context.size,
        subtle: context.variant === "subtle",
      })}
      data-size={context.size}
      {...props}
    >
      {children}
    </Toolbar.Group>
  );
};
