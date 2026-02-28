"use client";

import { EditorContent } from "@tiptap/react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { useTiptapEditorContext } from "./tiptap-editor-context";

export interface TiptapEditorContentProps extends Omit<
  ComponentProps<typeof EditorContent>,
  "editor"
> {
  withCodeHighlightStyles?: boolean;
  withTypographyStyles?: boolean;
}

export const TiptapEditorContent = ({
  className,
  withCodeHighlightStyles = true,
  withTypographyStyles = true,
  ...props
}: TiptapEditorContentProps) => {
  const context = useTiptapEditorContext();

  if (!context.editor) {
    return null;
  }

  return (
    <EditorContent
      className={cn(
        "kb-tiptap-content group-data-[size=lg]/kb-tiptap-root:[&_.ProseMirror]:min-h-40 group-data-[size=lg]/kb-tiptap-root:[&_.ProseMirror]:p-3.5 group-data-[size=md]/kb-tiptap-root:[&_.ProseMirror]:min-h-36 group-data-[size=md]/kb-tiptap-root:[&_.ProseMirror]:p-3 group-data-[size=sm]/kb-tiptap-root:[&_.ProseMirror]:min-h-28 group-data-[size=sm]/kb-tiptap-root:[&_.ProseMirror]:p-2.5 group-data-[size=xl]/kb-tiptap-root:[&_.ProseMirror]:min-h-44 group-data-[size=xl]/kb-tiptap-root:[&_.ProseMirror]:p-4 group-data-[size=xs]/kb-tiptap-root:[&_.ProseMirror]:min-h-24 group-data-[size=xs]/kb-tiptap-root:[&_.ProseMirror]:p-2",
        withTypographyStyles && "kb-tiptap-content--typography",
        withCodeHighlightStyles && "kb-tiptap-content--code",
        context.classNames?.content,
        className
      )}
      data-size={context.size}
      editor={context.editor}
      {...props}
    />
  );
};
