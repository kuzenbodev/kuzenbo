import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { CopyButton } from "@kuzenbo/core/ui/copy-button";
import { cn, tv } from "tailwind-variants";

const codeBlockToolbarVariants = tv({
  slots: {
    end: "flex shrink-0 items-center gap-2",
    language:
      "inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-xs text-muted-foreground",
    root: "flex items-center justify-between gap-3 border-b border-border bg-background/60 px-3 py-2",
    start: "flex min-w-0 items-center gap-2",
    title: "truncate text-xs text-muted-foreground",
  },
});

export interface CodeBlockToolbarSlotContext {
  copy: () => Promise<void>;
  copyValue?: string;
  language?: string;
}

export type CodeBlockToolbarSlot =
  | ReactNode
  | ((context: CodeBlockToolbarSlotContext) => ReactNode);

export interface CodeBlockToolbarProps extends Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "onCopy" | "title"
> {
  copyValue?: string;
  end?: CodeBlockToolbarSlot;
  language?: string;
  onCopy?: (value: string) => void | Promise<void>;
  start?: CodeBlockToolbarSlot;
  title?: ReactNode;
}

const renderToolbarSlot = (
  slot: CodeBlockToolbarSlot | undefined,
  context: CodeBlockToolbarSlotContext
): ReactNode => {
  if (typeof slot === "function") {
    return slot(context);
  }

  return slot ?? null;
};

export const CodeBlockToolbar = ({
  className,
  copyValue,
  end,
  language,
  onCopy,
  start,
  title,
  ...props
}: CodeBlockToolbarProps) => {
  const {
    end: endStyles,
    language: languageStyles,
    root,
    start: startStyles,
    title: titleStyles,
  } = codeBlockToolbarVariants();

  const copy = async (): Promise<void> => {
    if (!onCopy || copyValue === undefined) {
      return;
    }

    await onCopy(copyValue);
  };

  const slotContext: CodeBlockToolbarSlotContext = {
    copy,
    copyValue,
    language,
  };
  const defaultStartContent = (
    <>
      {language ? (
        <span
          className={languageStyles()}
          data-slot="code-block-toolbar-language"
        >
          {language}
        </span>
      ) : null}
      {title ? (
        <span className={titleStyles()} data-slot="code-block-toolbar-title">
          {title}
        </span>
      ) : null}
    </>
  );
  const renderedStart =
    start === undefined
      ? defaultStartContent
      : renderToolbarSlot(start, slotContext);
  const defaultEndContent =
    copyValue === undefined ? null : (
      <CopyButton size="xs" value={copyValue} variant="ghost" />
    );
  const renderedEnd =
    end === undefined ? defaultEndContent : renderToolbarSlot(end, slotContext);

  return (
    <div
      className={cn(root(), className)}
      data-language={language}
      data-slot="code-block-toolbar"
      {...props}
    >
      <div className={startStyles()} data-slot="code-block-toolbar-start">
        {renderedStart}
      </div>
      <div className={endStyles()} data-slot="code-block-toolbar-end">
        {renderedEnd}
      </div>
    </div>
  );
};
